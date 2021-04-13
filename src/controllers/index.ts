import {Solidity} from "./solidity";
// import {TestSuite} from "./ts";
import {JsApps} from "./js";
import {SE} from "./se";
import {TONOS} from "./tonos-cli";
import {
    matchName,
    Terminal,
} from "../core";
import {Signers} from "./signers";
import {Networks} from "./networks";
import {Contract} from "./contract";

export const controllers = [
    Solidity,
    SE,
    Networks,
    Signers,
    Contract,
    JsApps,
    TONOS,
];

export async function runCommand(terminal: Terminal, name: string, args: any): Promise<void> {
    const [controllerName, commandName] = name
        .toLowerCase()
        .split(" ")
        .map(x => x.trim())
        .filter(x => x !== "");
    const controller = controllers.find(x => matchName(x, controllerName));
    if (!controller) {
        throw new Error(`Controller ${controllerName} not found`);
    }
    const command = controller.commands.find(x => matchName(x, commandName));
    if (!command) {
        throw new Error(`Command ${commandName} not found in controller ${controllerName}`);
    }
    await command.run(terminal, args);
}
