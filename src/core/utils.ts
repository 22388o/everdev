import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import {
    spawn,
    SpawnOptionsWithoutStdio,
} from "child_process";
import * as https from "https";
import * as zlib from "zlib";
import * as unzip from "unzip-stream";
import request from "request";
import {Terminal} from "./index";

export function executableName(name: string): string {
    return `${name}${os.platform() === "win32" ? ".exe" : ""}`;
}

export function changeExt(path: string, newExt: string): string {
    return path.replace(/\.[^/.]+$/, newExt);
}

export async function loadBinaryVersions(name: string): Promise<string[]> {
    const info = await httpsGetJson(`https://binaries.tonlabs.io/${name}.json`);
    const versions = info[name].sort(compareVersions).reverse();
    return versions.length < 10 ? versions : [...versions.slice(0, 10), "..."];
}

async function installGlobally(dstPath: string, version: string, terminal: Terminal): Promise<void> {
    const binDir = path.dirname(dstPath);
    const [name, ext] = path.basename(dstPath).split(".");
    try {
        fs.writeFileSync(
            `${binDir}/package.json`,
            JSON.stringify(
                {
                    name: name, // ex: tonos-cli
                    version,
                    bin: `./${name}${ext ? "." + ext : ""}`,
                },
                null,
                2,
            ),
        );
        await run("npm", ["install", "-g"], {cwd: binDir}, terminal);
    } catch (err) {
        terminal.writeError(err);
        throw Error(`An error occurred while trying to install ${name} globally.
Make sure you can execute 'npm i <package> -g' without using sudo and try again`,
        );
    }
}

function downloadAndUnzip(dst: string, url: string, terminal: Terminal): Promise<void> {
    return new Promise((resolve, reject) => {
        request(url)
            .on("data", _ => {
                terminal.write(".");
            })
            .on("error", reject) // http protocol errors
            .pipe(
                unzip
                    .Extract({path: dst})
                    .on("error", reject) // unzip errors
                    .on("close", resolve),
            );
    });
}

export async function downloadFromGithub(terminal: Terminal, srcUrl: string, dstPath: string) {
    terminal.write(`Downloading from ${srcUrl}`);
    if (!fs.existsSync(dstPath)) {
        fs.mkdirSync(dstPath, {recursive: true});
    }
    await downloadAndUnzip(dstPath, srcUrl, terminal);
    terminal.write("\n");
}

function downloadAndGunzip(dest: string, url: string, terminal: Terminal): Promise<void> {
    return new Promise((resolve, reject) => {
        const request = https.get(url, response => {
            if (response.statusCode !== 200) {
                reject(
                    new Error(
                        `Download from ${url} failed with ${response.statusCode}: ${response.statusMessage}`,
                    ),
                );
                return;
            }
            let file: fs.WriteStream | null = fs.createWriteStream(dest, {flags: "w"});
            let opened = false;
            const failed = (err: Error) => {
                if (file) {
                    file.close();
                    file = null;

                    fs.unlink(dest, () => {
                    });
                    reject(err);
                }
            };

            const unzip = zlib.createGunzip();
            unzip.pipe(file);

            response.pipe(unzip);

            response.on("data", _ => {
                terminal.write(".");
            });

            request.on("error", err => {
                failed(err);
            });

            file.on("finish", () => {
                if (opened && file) {
                    resolve();
                }
            });

            file.on("open", () => {
                opened = true;
            });

            file.on("error", err => {
                if ((err as any).code === "EEXIST" && file) {
                    file.close();
                    reject("File already exists");
                } else {
                    failed(err);
                }
            });
        });
    });
}

export async function downloadFromBinaries(
    terminal: Terminal,
    dstPath: string,
    src: string,
    options?: {
        executable?: boolean,
        adjustedPath?: string,
        globally?: boolean,
        version?: string,
    },
) {
    src = src.replace("{p}", os.platform());
    const srcExt = path.extname(src).toLowerCase();
    const srcUrl = `https://binaries.tonlabs.io/${src}`;
    terminal.write(`Downloading from ${srcUrl}`);
    const dstDir = path.dirname(dstPath);
    if (!fs.existsSync(dstDir)) {
        fs.mkdirSync(dstDir, {recursive: true});
    }
    if (srcExt === ".zip") {
        await downloadAndUnzip(dstDir, srcUrl, terminal);
    } else if (srcExt === ".gz") {
        await downloadAndGunzip(dstPath, srcUrl, terminal);
        if (path.extname(dstPath) === ".tar") {
            await run("tar", ["xvf", dstPath], { cwd: path.dirname(dstPath) }, terminal);
            fs.unlink(dstPath, () => {});
        }
    } else {
        throw Error(`Unexpected binary file extension: ${srcExt}`);
    }
    if (options?.executable && os.platform() !== "win32") {
        fs.chmodSync(options?.adjustedPath ?? dstPath, 0o755);
        // Without pause on Fedora 32 Linux always leads to an error: spawn ETXTBSY
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (options?.globally) {
        if (!options.version) {
            throw Error("Version required to install package");
        }
        await installGlobally(dstPath, options.version, terminal).catch(err => {
            fs.unlink(dstPath, () => {
            });
            throw err;
        });
    }
    terminal.write("\n");
}

export function run(
    name: string,
    args: string[],
    options: SpawnOptionsWithoutStdio,
    terminal: Terminal,
): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const isWindows = os.platform() === "win32";
            const spawned = isWindows
                ? spawn("cmd.exe", ["/c", name].concat(args), {
                    env: process.env,
                    ...options,
                })
                : spawn(name, args, {
                    env: process.env,
                    ...options,
                });
            const output: string[] = [];

            spawned.stdout.on("data", function (data) {
                const text = data.toString();
                output.push(text);
                terminal.log(text);
            });

            spawned.stderr.on("data", data => {
                const text = data.toString();
                terminal.writeError(text);
            });

            spawned.on("error", err => {
                reject(err);
            });

            spawned.on("close", code => {
                if (code === 0) {
                    resolve(output.join(""));
                } else {
                    reject(`${name} failed`);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

export function uniqueFilePath(folderPath: string, namePattern: string): string {
    let index = 0;
    while (true) {
        const filePath = path.resolve(
            folderPath,
            namePattern.replace("{}", index === 0 ? "" : index.toString()),
        );
        if (!fs.existsSync(filePath)) {
            return filePath;
        }
        index += 1;
    }
}

export const consoleTerminal: Terminal = {
    write(text: string) {
        process.stdout.write(text);
    },
    writeError(text: string) {
        process.stderr.write(text);
    },
    log(...args) {
        console.log(...args);
    },
};

export const nullTerminal: Terminal = {
    write(_text: string) {
    },
    writeError(_text: string) {
    },
    log(..._args) {
    },
};

export function versionToNumber(s: string): number {
    if (s.toLowerCase() === "latest") {
        return 1_000_000_000;
    }
    const parts = `${s || ""}`
        .split(".")
        .map(x => Number.parseInt(x))
        .slice(0, 3);
    while (parts.length < 3) {
        parts.push(0);
    }
    return parts[0] * 1000000 + parts[1] * 1000 + parts[2];
}

export function compareVersions(a: string, b: string): number {
    const an = versionToNumber(a);
    const bn = versionToNumber(b);
    return an < bn ? -1 : (an === bn ? 0 : 1);
}

let _progressLine: string = "";

export function progressLine(terminal: Terminal, line: string) {
    terminal.write(`\r${line}`);
    const extra = _progressLine.length - line.length;
    if (extra > 0) {
        terminal.write(" ".repeat(extra) + "\b".repeat(extra));
    }
    _progressLine = line;
}

export function progress(terminal: Terminal, info: string) {
    progressLine(terminal, `${info}...`);
}

export function progressDone(terminal: Terminal) {
    terminal.log(" ✓");
    _progressLine = "";
}

export function httpsGetJson(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const tryUrl = (url: string) => {
            https
                .get(url, function (res) {
                    let body = "";

                    res.on("data", function (chunk) {
                        body += chunk;
                    });

                    res.on("end", function () {
                        if (res.statusCode === 301) {
                            const redirectUrl = res.headers["location"];
                            if (redirectUrl) {
                                tryUrl(redirectUrl);
                            } else {
                                reject(new Error("Redirect response has no `location` header."));
                            }
                            return;
                        }
                        const response = JSON.parse(body);
                        resolve(response);
                    });
                })
                .on("error", error => {
                    reject(error);
                });
        };
        tryUrl(url);
    });
}

function toIdentifier(s: string): string {
    let identifier = "";
    for (let i = 0; i < s.length; i += 1) {
        const c = s[i];
        const isLetter = c.toLowerCase() !== c.toUpperCase();
        const isDigit = !isLetter && "0123456789".includes(c);
        if (isLetter || isDigit) {
            identifier += c;
        }
    }
    return identifier;
}

export function userIdentifier(): string {
    return toIdentifier(os.userInfo().username).toLowerCase();
}

function toString(value: any): string {
    return value === null || value === undefined ? "" : value.toString();
}

export function formatTable(rows: any[][], options?: { headerSeparator?: boolean }): string {
    const widths: number[] = [];
    const updateWidth = (value: any, i: number) => {
        const width = toString(value).length;
        while (widths.length <= i) {
            widths.push(0);
        }
        widths[i] = Math.max(widths[i], width);
    };
    rows.forEach(x => x.forEach(updateWidth));
    const formatValue = (value: any, i: number) => toString(value).padEnd(widths[i]);
    const formatRow = (row: any[]) => row.map(formatValue).join("  ").trimEnd();
    const lines = rows.map(formatRow);
    if (options?.headerSeparator) {
        const separator = formatRow(widths.map(x => "-".repeat(x)));
        lines.splice(1, 0, separator);
    }
    return lines.join("\n");
}
