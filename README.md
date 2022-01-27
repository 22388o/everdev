<p align="center"><a href="https://www.npmjs.com/package/everdev"><img src="assets/everdev.png" height="60"/></a></p>
<h1 align="center">EverDev</h1>
<p align="center">Everscale Development Environment</p>
<h1 align="center"><a href="docs/quick_start.md">Quick Start</a></h1>

**Get quick help in our telegram channel:**

[![Channel on Telegram](https://img.shields.io/badge/chat-on%20telegram-9cf.svg)](https://t.me/ton_sdk)

## Content Table

- [Content Table](#content-table)
- [What is EverDev?](#what-is-everdev)
  - [Use-cases](#use-cases)
  - [What tools does it support?](#what-tools-does-it-support)
- [Quick Start](#quick-start)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Download](#download)
  - [Update](#update)
- [Use in JS applications](#use-in-js-applications)
- [Command Line Interface](#command-line-interface)
  - [Quick start](#quick-start-1)
  - [General command syntax](#general-command-syntax)
  - [Solidity](#solidity)
    - [Create your first contract](#create-your-first-contract)
    - [Compile](#compile)
    - [Ast](#ast)
    - [Version](#version)
    - [Update](#update-1)
    - [Set](#set)
  - [C++](#c)
    - [Create your first contract](#create-your-first-contract-1)
    - [Compile](#compile-1)
    - [Version](#version-1)
    - [Update](#update-2)
    - [Set](#set-1)
  - [TON OS Startup Edition(SE)](#ton-os-startup-editionse)
    - [Start](#start)
    - [Version](#version-2)
    - [Set](#set-2)
    - [Reset](#reset)
    - [Update](#update-3)
    - [Stop](#stop)
    - [Info](#info)
  - [SDK](#sdk)
    - [See the list of available demo projects](#see-the-list-of-available-demo-projects)
    - [Install demo project](#install-demo-project)
    - [Create an empty project](#create-an-empty-project)
    - [Create contract JS wrapper](#create-contract-js-wrapper)
  - [tonos-cli](#tonos-cli)
    - [Install](#install-1)
    - [Version](#version-3)
    - [Set](#set-3)
    - [Update](#update-4)
  - [TestSuite4](#testsuite4)
    - [Version](#version-4)
    - [Install](#install-2)
    - [Update](#update-5)
    - [Create](#create)
    - [Run](#run)
  - [Signer Tool](#signer-tool)
    - [Add a signer with randomly generated keys](#add-a-signer-with-randomly-generated-keys)
    - [Add a signer with specific keys](#add-a-signer-with-specific-keys)
    - [List registered signers](#list-registered-signers)
    - [Get signer details](#get-signer-details)
    - [Set default signer](#set-default-signer)
    - [Delete a signer](#delete-a-signer)
  - [Network Tool](#network-tool)
    - [Add a network](#add-a-network)
    - [Set a giver for a network](#set-a-giver-for-a-network)
    - [List registered networks](#list-registered-networks)
    - [Set default network](#set-default-network)
    - [Delete a network](#delete-a-network)
  - [Contract Management](#contract-management)
    - [View contract info](#view-contract-info)
    - [Deploy contract](#deploy-contract)
    - [Run contract deployed on the network](#run-contract-deployed-on-the-network)
    - [Run contract locally on TVM](#run-contract-locally-on-tvm)
    - [Emulate transaction executor locally on TVM](#emulate-transaction-executor-locally-on-tvm)
    - [Top up contract balance from giver](#top-up-contract-balance-from-giver)
  - [DeBrowser](#debrowser)
    - [Version](#version-5)
    - [Interfaces](#interfaces)
    - [Start](#start-1)
    - [Stop](#stop-1)
- [View controller info](#view-controller-info)
- [Working with DevNet](#working-with-devnet)
- [EverDev Extensibility](#everdev-extensibility)
- [Troubleshooting](#troubleshooting)

## What is EverDev?

EverDev is a Node.js package with CLI interface that allows to perform the following use-cases from the single interface for Developer:

### Use-cases

- Easily manage all the core [Ever OS Developer Tools](https://ton.dev/)
- Configure networks (including Local Blockchain, Developer Network, Everscale (main) network): add, configure giver;
- Manage keys: add, remove
- Work with Everscale blockchain from CLI

Also, this project serves as a backend for [EverDev VS Code extension](https://github.com/tonlabs/everdev-vscode).

### What tools does it support?

Components are downloaded and installed automatically for the target platform upon the first request.

- [Solidity Compiler](#solidity)

- [C/C++ Compiler](#c)

- [Contract Management Tool](#contract-management) - Work with your contracts from CLI. Deploy and run your contracts with convenient CLI commands.

- [Network Tool](#network-tool) - manage your networks: add, remove, configure givers.

- [Signer Tool](#signer-tool) - manage your keys and seedphrases: create your secret once and use it via alias with Contract Management Tool. Really easy.

- [TON OS Startup Edition](#ton-os-startup-editionse) – Local blockchain for development and testing

- [Debot Browser](#debrowser) - Web debot browser. For now, Extraton Debot Browser is supported. Support of Surf Debot Browser is coming.

- [TestSuite4](#testsuite4) – Python lightweight framework for contract testing.

- [tonos-cli](https://github.com/tonlabs/tonos-cli) – Command line tool for multisigwallet management and staking, includes CLI Debot Browser. EverDev helps with installation and version management.

EverDev can be extended with other tools following the [instructions of integration](#everdev-extensibility).

## Quick Start

Get your hands dirty with our great tools:)
Follow the [Quick Start](docs/quick_start.md) to get on board of Ever OS Development ASAP!

## Installation

### Prerequisites

- [`Node.js`](https://nodejs.org/) >= 14.x installed
- (optional) [`Docker`](https://www.docker.com/)  >= 19.x installed
- Solidity compiler requires VC++ Runtime on Windows. You can install it from [the latest supported Visual C++ downloads](https://support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9aff-95f26a218cc0).

### Install

```shell
npm i -g everdev
```

If you see an EACCESS error when you try to install a package globally on Mac or Linux, [please see this instruction](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

### Download

You can download precompiled binaries for your platform from [the latest release](https://github.com/tonlabs/everdev/releases/latest).
After download you need to create directory if it does not exists.

For linux/macos:
> ```shell
> mkdir -p ~/.everdev/bin
> ```
> Then unpack `everdev` from archive into this folder.

For windows:
> ```shell
> md $env:HOMEDRIVE$env:HOMEPATH\.everdev\bin
> ```
> Then move downloaded binary as `everdev.exe` into this folder.

To make it possible to run `everdev` from any folder, you need to update the system PATH environment variable.

For linux/macos:
> ```shell
> echo 'export PATH=~/.everdev/bin:$PATH' >> ~/.profile && source ~/.profile
> ```

For windows run PowerShell and execute this line:
> ```powershell
> [System.Environment]::SetEnvironmentVariable("PATH", "$env:HOMEDRIVE$env:HOMEPATH\.everdev\bin;$([System.Environment]::GetEnvironmentVariable("PATH", [System.EnvironmentVariableTarget]::User))", [System.EnvironmentVariableTarget]::User)
> ```

*After trying to run `everdev` on macos you can see the error: "everdev" cannot be opened because the developer cannot be verified. Open your computer System Preferences > Security & Privacy > Privacy. Here, you should see an option to click "Allow Anyway" next to the "everdev" application in question.*


### Update

```shell
npm r -g everdev
npm i -g everdev
```

## Use in JS applications

You can easily use everdev as a regular npm package in your JS applications.

Just add dependency into you `package.json`:

```shell
npm i -s everdev
```

And then run any command from everdev:

```js
const { consoleTerminal, runCommand } = require("everdev");
const path = require("path");

async function main() {
    await runCommand(consoleTerminal, "sol compile", {
        file: path.resolve(__dirname, "Hello.sol")
    });
}

main();
```

## Command Line Interface

### Quick start
Start testing your contracts without any delay with this guide. It will help you get test tokens in Developer Network, prepare your environment and test your first contract.
[Test my first contract!](https://github.com/tonlabs/everdev/blob/main/docs/work_with_contracts.md)

### General command syntax

```shell
everdev <tool> <command> ...args
```
Some tools (network, signer, contract, js) and commands have short aliases. For example instead of using `everdev network list` you can use `everdev n l` and even shorter `everdev nl`.


### Solidity

#### Create your first contract

This command creates a hello-world Solidity contract with comments that you can observe and compile.

```shell
everdev sol create Contract
```

#### Compile

This command compiles and links a selected Solidity contract.
After successful compilation you get .abi.json and .tvc files that you can later [use in your DApps to deploy and run contract methods](https://docs.ton.dev/86757ecb2/p/07f1a5-add-contract-to-your-app-/b/462f33).

```shell
everdev sol compile Contract.sol
```

To save generated assembler code use `-c` option (default is false)

```shell
everdev sol compile Contract.sol -c path/to/output/file
```
Assembler code will be saved in path/to/output/file with the extension `code`


You can specify the output files location with the `-o` option:

```shell
everdev sol compile Contract.sol -o path/to/output/file
```

#### Ast

This command parses a ton-solidity file and creates an abstract syntax tree (AST) to the output directory.

```shell
everdev sol ast Contract.sol
```

To specify the ast format type, use `-f` or `--format` option:

```shell
everdev sol ast-json Contract.sol -f <json | compact-json>
```

To point the location of the output folder, use the `-o` or `--output-dir` option:

```shell
everdev sol ast-json Contract.sol -f <json | compact-json> -o path/to/output/file
```

#### Version

This command shows the currently installed Solidity compiler version.

```shell
everdev sol version
```

#### Update

This command updates the compiler and linker to the latest version.

```shell
everdev sol update
```
**Attention!**
Use --force option to force update of components that do not update their version.

#### Set

This command sets the compiler and linker versions and downloads them if needed.

```shell
everdev sol set --compiler 0.38.0 --linker 0.23.54
```
**Attention!**
Use --force option to force update of components that do not update their version.

### C++

#### Create your first contract

This command creates a basic C++ contract with comments that you can observe and compile.

```shell
everdev clang create Contract
```

#### Compile

This command compiles and links a selected C++ contract.
After successful compilation you get .abi.json and .tvc files that you can later [use in your DApps to deploy and run contract methods](https://docs.ton.dev/86757ecb2/p/07f1a5-add-contract-to-your-app-/b/462f33).

```shell
everdev clang compile Contract.cpp
```

#### Version

This command shows the currently installed C++ compiler version.

```shell
everdev clang version
```

#### Update

This command updates the compiler to the latest version.

```shell
everdev clang update
```

Use `--force` or `-f` option to force reinstall, if the compiler is already up to date.

#### Set

This command sets the compiler version and downloads it if needed.

```shell
everdev clang set --compiler 7.0.0
```

Use `--force` or `-f` option to force reinstall, if the current version is the same as the requested version.

### TON OS Startup Edition(SE)

#### Start
This command starts the TON OS SE container (Docker must be launched). When executed for the first time downloads the latest SE image from dockerhub.

```shell
everdev se start
```

#### Version
This command shows the default TON OS SE version and list of other available versions.

```shell
everdev se version

default: 0.24.12
Available Versions: 0, 0.24, 0.24.5, 0.24.6, 0.24.8, 0.24.9, 0.24.10, 0.24.11, 0.24.12, latest
```

#### Set
This command switches TON OS SE to the specified version and port and downloads it, if it is missing.
**Attention! This command does not start TON OS SE, you need to run `start` command separately.**

```shell
everdev se set --version 0.24.11 --port 2020
```

#### Reset
This command resets the TON OS SE container (Docker must be launched) - restarts it from scratch with a clean database.

```shell
everdev se reset
```
#### Update
This command downloads the latest TON OS SE image (Docker must be launched) and starts it.

```shell
everdev se update
```

#### Stop
This command stops TON OS SE container.

```shell
everdev se stop
```

#### Info
This command shows info about the downloaded versions.

```shell
everdev se info

Instance  State    Version  GraphQL Port  ArangoDB Port  Docker Container            Docker Image
--------  -------  -------  ------------  -------------  --------------------------  --------------------------
default   running  0.24.12  2020                         tonlabs-tonos-se-ekaterina  tonlabs/local-node:0.24.12
```

### SDK

#### See the list of available demo projects

This command shows the list of available demo projects

```shell
everdev js demo
```

Result:

```shell
$ everdev js demo
Demo          Description
------------  -------------------------
hello-wallet  Simple NodeJs Application
```

#### Install demo project

This command installs the specified demo project to the current directory. Proceed the instructions in the terminal to run it.

```shell
everdev js demo hello-wallet
```

#### Create an empty project

This command creates a Node.js project with SDK latest dependencies and index.js file with main Client object creation.

```shell
everdev js create test_project
```

#### Create contract JS wrapper

This command takes abi and, optionally, tvc file and generates a JS wrapper with abi and tvc converted into base64 that can be used further in SDK.
tvc file must have the same name as abi.

```shell
everdev js wrap contractName.abi.json
```
The result name of the wrapper will be "ContractName||"Contract".js".

See other available generation options with help command:

```shell
everdev js wrap -h
EverDev Version: 0.4.0
Use: everdev js wrap file [options]
Args:
    file  ABI file
Options:
    --help, -h    Show command usage
    --print, -p   Print code to console
    --output, -o  Set output file name (default is built from source ABI file name)
    --export, -e  Export type and options
                  commonjs          Use CommonJS modules (NodeJs)
                  commonjs-default  Use CommonJS modules (NodeJS) with default export
                  es6               Use ES6 modules
                  es6-default       Use ES6 modules with default export
```

### tonos-cli

EverDev installs tonos-cli globally, so after the installation is complete, you can access the functionality via command:

```shell
tonos-cli <command> <args>
```
[See the tonos-cli usage documentation](https://github.com/tonlabs/tonos-cli#how-to-use).
[See tonos-cli guides](https://docs.ton.dev/86757ecb2/p/8080e6-tonos-cli/t/44972c).

#### Install

This command installs the latest tonos-cli

```shell
everdev tonos-cli install
```
The installer requires NPM to be installed, so it can install packages globally without using sudo.
In case of error, manually set environment variable `PATH=$PATH:$HOME/.everdev/solidity`

#### Version

This command shows the used tonos-cli version and list of available for download versions

```shell
everdev tonos-cli version

Version    Available
---------  ------------------------------------------------------
0.8.1      0.6.0, 0.6.1, 0.6.2, 0.7.1, 0.6.3, 0.7.0, 0.8.0, 0.8.1
```

#### Set

This command specifies tonos-cli version to use and downloads it if needed.

```shell
everdev tonos-cli set --version 0.8.0
```


#### Update

This command updates tonos-cli version to the latest

```shell
everdev tonos-cli update
```


### TestSuite4

TestSuite4 is a framework designed to simplify development and testing of TON Contracts. It contains lightweight blockchain emulator making it easy to develop contracts in a TDD-friendly style.

For more information, visit [TestSuite4's documentation](https://tonlabs.github.io/TestSuite4/).

:information_source: `Python 3.6 - 3.9` and `pip` required.

#### Version

This command shows the currently installed and available TestSuite4 framework versions.

```
everdev ts4 version
```

#### Install

This command installs (using `pip`) TestSuite4's latest or selected version and downloads them if needed.

```bash
everdev ts4 install # install latest version

everdev ts4 install 0.2.0 # install version 0.2.0
```

#### Update

This command updates TestSuite4 to the latest version.

```
everdev ts4 update
```

#### Create

This command creates a TestSuite4's template of the test (`TestName.py`).

```bash
everdev ts4 create TestName

everdev ts4 create TestName --folder tests # creates tests/TestName.py (folder must exist)
```

#### Run

This command runs selected test (`TestName.py`).

```
everdev ts4 run TestName
```


### Signer Tool

Signer registry is a centralized place where you can store your development keys.

Each signer in registry has an unique user defined name. All everdev commands
that require signing or encryption refer to the signer by name.

You can mark one of the signers as a default.
It can be used in signing commands without providing signer option.

Signer repository management in everdev is accessible through the `signer` tool.

**Note:** If you need to generate an unsigned message, you may use the option `--signer none` in any relevant commands in other controllers. Omitting the signer option altogether always means using the default signer.

**Note:** Keys in the repository are stored unencrypted.

#### Add a signer with randomly generated keys

This command adds a signer with randomly generated keys.

```bash
everdev signer generate signer_name
```

See other available generation options with help command:

```bash
everdev signer generate -h
EverDev Version: 0.5.0
Use: everdev signer generate name [options]
Args:
    name  Signer name
Options:
    --help, -h        Show command usage
    --mnemonic, -m    Use mnemonic phrase
    --dictionary, -d  Mnemonic dictionary
                      0  TON
                      1  English
                      2  Chinese Simplified
                      3  Chinese Traditional
                      4  French
                      5  Italian
                      6  Japanese
                      7  Korean
                      8  Spanish
    --words, -w       Number of mnemonic words
    --force, -f       Overwrite signer if already exists
```

#### Add a signer with specific keys

This command adds a signer with previously generated (e.g. with tonos-cli) keys.

```bash
everdev signer add signer_name signer_secret_key_or_seed_phrase_in_quotes
```

See other available signer addition options with help command:

```bash
everdev signer add -h
EverDev Version: 0.5.0
Use: everdev signer add name secret [options]
Args:
    name    Signer name
    secret  Secret key or seed phrase
Options:
    --help, -h        Show command usage
    --dictionary, -d  Mnemonic dictionary
                      0  TON
                      1  English
                      2  Chinese Simplified
                      3  Chinese Traditional
                      4  French
                      5  Italian
                      6  Japanese
                      7  Korean
                      8  Spanish
    --force, -f       Overwrite signer if already exists
```
**Note:** By default the dictionary is set to english, which allows using seed phrases generated by other TONOS tools, such as tonos-cli.


#### List registered signers

This command lists all registered signers with their public keys.

```bash
everdev signer list
```

Result:

```bash
$ everdev signer list

Signer           Public Key
---------------  ----------------------------------------------------------------
sign1 (Default)  cffd3a2f1d241807b2205220a7d6df980e67a3cc7c47eba2766cdc1bbddfc0e3
sign2            0fc4e781720d80f76257db333c6b6934090562418652cf30352878c87707aa94
```

#### Get signer details

This command lists all information (including secret data) for a specified signer.

```bash
everdev signer info signer_name
```

Result:

```bash
$ everdev signer info sign2
{
    "name": "sign2",
    "description": "",
    "keys": {
        "public": "760d69964d038997d891fca0a0407c2ffefb701e7cb2f9ff0a87fbbf1e8098f2",
        "secret": "72571b5a9392e6bb215b460ca3c0545c34d790e185f66f5b2e7564329ffea86c"
    }
}
```

#### Set default signer

This command sets a previously added signer as default (initially the first added signer is used by default).

```bash
everdev signer default signer_name
```

#### Delete a signer

This command deletes a previously added signer from signer registry.

```bash
everdev signer delete signer_name
```

### Network Tool

Network tool is a convenient way to organize all of your network configurations in one place.

You can register several blockchains (networks) under short names
and then use these names as a target blockchain when working with contracts.

You can mark one of the networks as a default.
It can be used in network commands without providing net name.

#### Add a network

This command adds a network to the everdev registry.

```bash
everdev network add network_name network_endpoints
```

See other available network addition options with help command:

```bash
$ everdev network add -h
EverDev Version: 0.5.0
Use: everdev network add name endpoints [options]
Args:
    name
    endpoints  Comma separated endpoints
Options:
    --help, -h   Show command usage
    --force, -f  Overwrite key if already exists
```

Example with all [main.ton.dev endpoints](https://docs.ton.dev/86757ecb2/p/85c869-networks):

```bash
everdev network add main main.ton.dev,main2.ton.dev,main3.ton.dev,main4.ton.dev
```

#### Set a giver for a network

This command sets a giver account for a network. Giver will be used to top up your account balances on the network, including during deployment.

```bash
everdev network giver network_name giver_address
```

See other available network addition options with help command:

```bash
$ everdev network giver -h
EverDev Version: 0.5.0
Use: everdev network giver name address [options]
Args:
    name     Network name
    address  Giver address
Options:
    --help, -h    Show command usage
    --signer, -s  Signer to be used with giver
    --value, -v   Deploying account initial balance in nanotokens
```
**Note:** The default signer and the initial balance value of 10 tokens will be used, unless otherwise specified through options. Also note, that some contracts may require a higher initial balance for successful deployment. DePool contract, for instance, requires a minimun of 21 tokens.

Only one giver can be set for a network. Setting another one will overwrite the current giver.
To view the current giver settings for all networks, use the `everdev network list` command (for details see the section [below](#list-registered-networks)).

#### List registered networks

This command lists all registered networks, their public endpoints, and their giver addresses, if any.

```bash
everdev network list
```

Result:

```bash
$ everdev network list
Network        Endpoints                                        Giver
-------------  -----------------------------------------------  ------------------------------------------------------------------
se             http://localhost                                 0:b5e9240fc2d2f1ff8cbb1d1dee7fb7cae155e5f6320e585fcc685698994a19a5
dev (Default)  net.ton.dev, net1.ton.dev, net5.ton.dev          0:255a3ad9dfa8aa4f3481856aafc7d79f47d50205190bd56147138740e9b177f3
main           main.ton.dev, main2.ton.dev, main3.ton.dev, ...
```

#### Set default network

This command sets a previously added network as default (initially the mainnet is used by default).

```bash
everdev network default network_name
```

#### Delete a network

This command deletes a network from everdev registry.

```bash
everdev network delete network_name
```


### Contract Management

Contract management in everdev gives you the ability to easily deploy and run
your smart contracts on blockchain network(s).

#### View contract info

This command displays a detailed summary for a contract. Contract ABI and TVC files are required to run it. Account address on the network is calculated from TVC and signer.

```bash
everdev contract info abi_filename
```

Result example:

```bash
$ everdev contract info SetcodeMultisigWallet.abi.json

Configuration

  Network: dev (net.ton.dev, net1.ton.dev, net5.ton.dev)
  Signer:  test (public ad4bf7bd8da244932c52127a943bfa9217b6e215c1b3307272283c4d64f34486)

Address:   0:04dee1edc3f3d6b23529dcf5a6133627d06a39826bb14cc6334ffea272b15d50 (calculated from TVC and signer public)
Code Hash: e2b60b6b602c10ced7ea8ede4bdf96342c97570a3798066f3fb50a4b2b27a208 (from TVC file)
Account:   Active
Balance:   1919381000 (≈ 2 tokens)
Details:   {
    "json_version": 5,
    "id": "0:04dee1edc3f3d6b23529dcf5a6133627d06a39826bb14cc6334ffea272b15d50",
    "workchain_id": 0,
    "boc": "te6ccgECZwEAGvQAAm/AAE3uHtw/PW ... 4MEDIoIQ/////byxkOAB8AH4R26Q3o (6912 bytes)",
    "last_paid": 1619084675,
    "bits": "0xcbc7",
    "cells": "0x67",
    "public_cells": "0x0",
    "last_trans_lt": "0x3baac81fb43",
    "balance": "0x72676e08",
    "code": "te6ccgECXwEAGcoAAib/APSkICLAAZ ... wQMighD////9vLGQ4AHwAfhHbpDeg= (6614 bytes)",
    "code_hash": "e2b60b6b602c10ced7ea8ede4bdf96342c97570a3798066f3fb50a4b2b27a208",
    "data": "te6ccgEBBwEA7gAC361L972NokSTLF ... S/Xy90TNN3lUFM1WGpdlIcBQDAAAFA (249 bytes)",
    "data_hash": "ec28abd34e75f40a66561bdc06b436cbe24d10d5da7519a7d5db41026c67155d",
    "acc_type": 1,
    "acc_type_name": "Active"
}

```

Network, signer, data and account address parameters can be overridden with the following options:

```bash
$ everdev contract info -h
EverDev Version: 0.5.0
Use: everdev contract info file [options]
Args:
    file  ABI file
Options:
    --help, -h     Show command usage
    --network, -n  Network name
    --signer, -s   Signer key name
    --data, -d     Deploying initial data as name:value,...
                   This data is required to calculate the account address and to
                   deploy contract.
                   Array values must be specified as [item,...]. Spaces are not
                   allowed. If value contains spaces or special symbols "[],:"
                   it must be enclosed in "" or ''
    --address, -a  Account address
```

#### Deploy contract

This command deploys a contract to the blockchain. Contract ABI and TVC files are required to run it.

```bash
everdev contract deploy abi_filename
```

Command displays deployment summary and requests constructor function parameters. Result example:

```bash
$ everdev contract deploy Contract.abi.json

Configuration

  Network: dev
  Signer:  sign1

Address: 0:0435cb4e70585759ac514bb9fd1770caeb8c3941d882b5a16d589b368cb49261

Enter constructor parameters

  param1 (uint256[]): value

Enter constructor parameters

  param2 (uint8): value

Deploying...
```

Deploy parameters can be specified in the deploy command with the following options:

```bash
$ everdev contract deploy -h
EverDev Version: 0.5.0
Use: everdev contract deploy file function [options]
Args:
    file      ABI file
    function  Function name
Options:
    --help, -h        Show command usage
    --network, -n     Network name
    --signer, -s      Signer key name
    --input, -i       Function parameters as name:value,...
                      Array values must be specified as [item,...]. Spaces are not
                      allowed. If value contains spaces or special symbols "[],:"
                      it must be enclosed in "" or ''
    --data, -d        Deploying initial data as name:value,...
                      This data is required to calculate the account address and to
                      deploy contract.
                      Array values must be specified as [item,...]. Spaces are not
                      allowed. If value contains spaces or special symbols "[],:"
                      it must be enclosed in "" or ''
    --value, -v       Deploying balance value in nano tokens
    --prevent-ui, -p  Prevent user interaction
                      Useful in shell scripting e.g. on server or in some
                      automating to disable waiting for the user input.
                      Instead everdev will abort with error.
                      For example when some parameters are missing in command line
                      then ton dev will prompt user to input values for missing
                      parameters (or fails if prevent-ui option is specified).

```

Example of a 2/3 multisig wallet deployment command:

```bash
everdev contract deploy SetcodeMultisigWallet.abi.json constructor -n dev -s sign1 -i owners:[0xad4bf7bd8da244932c52127a943bfa9217b6e215c1b3307272283c4d64f34486,0x5c2e348c5caeb420a863dc5e972f897ebe5ee899a6ef2a8299aac352eca4380a,0x8534c46f7a135058773fa1298cb3a299a5ddd40dafe41cb06c64f274da360bfb],reqConfirms:2
```

#### Run contract deployed on the network

This command runs any function of a contract deployed on the blockchain. Contract ABI and TVC files are required to run it.

```bash
everdev contract run abi_filename
```

Command displays available functions and asks to select one. Result example:

```bash
$ everdev contract run Contract.abi.json

Configuration

  Network: dev
  Signer:  sign1

Address: 0:a4629d617df931d8ad86ed24f4cac3d321788ba082574144f5820f2894493fbc

Available functions:

  1) func1
  2) func2

  Select function (number): 2

Running...
```

Network, signer and account address parameters can be overridden and function parameters specified in the command with the following options:

```bash
$ everdev contract run -h
EverDev Version: 0.5.0
Use: everdev contract run file function [options]
Args:
    file      ABI file
    function  Function name
Options:
    --help, -h        Show command usage
    --network, -n     Network name
    --signer, -s      Signer key name
    --data, -d        Deploying initial data as name:value,...
                      This data is required to calculate the account address and to
                      deploy contract.
                      Array values must be specified as [item,...]. Spaces are not
                      allowed. If value contains spaces or special symbols "[],:"
                      it must be enclosed in "" or ''
    --address, -a     Account address
    --input, -i       Function parameters as name:value,...
                      Array values must be specified as [item,...]. Spaces are not
                      allowed. If value contains spaces or special symbols "[],:"
                      it must be enclosed in "" or ''
    --prevent-ui, -p  Prevent user interaction
                      Useful in shell scripting e.g. on server or in some
                      automating to disable waiting for the user input.
                      Instead everdev will abort with error.
                      For example when some parameters are missing in command line
                      then ton dev will prompt user to input values for missing
                      parameters (or fails if prevent-ui option is specified).
```

Example of creating a transaction and confirming it in a multisig wallet:

```
everdev contract run SetcodeMultisigWallet.abi.json submitTransaction -n dev -s sign1 -i dest:255a3ad9dfa8aa4f3481856aafc7d79f47d50205190bd56147138740e9b177f3,value:500000000,bounce:true,allBalance:false,payload:""
```

```
everdev contract run SetcodeMultisigWallet.abi.json confirmTransaction -n dev -a 0:04dee1edc3f3d6b23529dcf5a6133627d06a39826bb14cc6334ffea272b15d50 -s sign2 -i transactionId:6954030467099431873
```

To **execute a contract without signing**, use `signer none` option:

```
everdev contract run --signer none --address <address>
```

or

```
everdev contract run -s none -a <address>
```
In this case you have to explicitly specify address in run function because otherwise everdev may calculate a wrong address from empty pubkey.


To **execute a smart contract function with bytes argument**, the argument needs to be in hex format.

Example:

```
cat bytes | xxd -p | tr -d '\n' > bytes.hex
everdev contract run contract.abi.json function_name -i value:$(cat bytes.hex)
```


**Execute a smart contract function with structure argument**:
```
everdev contract run shapes.tvc \
    --address 0:540c1837656674d548c934258ddec9b5fd11b543da977b0016c14b5650bc7eb5 \
    --input '{ "point": { "color": "red", "center": { "x": 1, "y": 2 } } }'
```

#### Run contract locally on TVM

This command downloads a contract and runs it locally on TVM. Contract ABI and TVC files are required to run it.

```bash
everdev contract run-local abi_filename
```

Command displays available functions and asks to select one. Result example:

```bash
$ everdev contract run-local Contract.abi.json
Configuration

  Network: dev
  Signer:  sign1

Address: 0:a4629d617df931d8ad86ed24f4cac3d321788ba082574144f5820f2894493fbc

Available functions:

  1) func1
  2) func1

  Select function (number):
```

Network, signer and account address parameters can be overridden and function parameters specified in the command with the following options:

```bash
$ everdev contract run-local -h
EverDev Version: 0.5.0
Use: everdev contract run-local file function [options]
Args:
    file      ABI file
    function  Function name
Options:
    --help, -h        Show command usage
    --network, -n     Network name
    --signer, -s      Signer key name
    --data, -d        Deploying initial data as name:value,...
                      This data is required to calculate the account address and to
                      deploy contract.
                      Array values must be specified as [item,...]. Spaces are not
                      allowed. If value contains spaces or special symbols "[],:"
                      it must be enclosed in "" or ''
    --address, -a     Account address
    --input, -i       Function parameters as name:value,...
                      Array values must be specified as [item,...]. Spaces are not
                      allowed. If value contains spaces or special symbols "[],:"
                      it must be enclosed in "" or ''
    --prevent-ui, -p  Prevent user interaction
                      Useful in shell scripting e.g. on server or in some
                      automating to disable waiting for the user input.
                      Instead everdev will abort with error.
                      For example when some parameters are missing in command line
                      then ton dev will prompt user to input values for missing
                      parameters (or fails if prevent-ui option is specified).
```

#### Emulate transaction executor locally on TVM

This command downloads a contract and emulates transaction execution locally on TVM. Contract ABI and TVC files are required to run it.

```bash
everdev contract run-executor abi_filename
```

Command displays available functions and asks to select one. Result:

```bash
$ everdev contract run-executor Contract.abi.json

Configuration

  Network: dev
  Signer:  sign1

Address: 0:a4629d617df931d8ad86ed24f4cac3d321788ba082574144f5820f2894493fbc

Available functions:

  1) func1
  2) func2

  Select function (number):
```

Network, signer and account address parameters can be overridden and function parameters specified in the command with the following options:

```bash
$ everdev contract run-executor -h
EverDev Version: 0.5.0
Use: everdev contract run-executor file function [options]
Args:
    file      ABI file
    function  Function name
Options:
    --help, -h        Show command usage
    --network, -n     Network name
    --signer, -s      Signer key name
    --data, -d        Deploying initial data as name:value,...
                      This data is required to calculate the account address and to
                      deploy contract.
                      Array values must be specified as [item,...]. Spaces are not
                      allowed. If value contains spaces or special symbols "[],:"
                      it must be enclosed in "" or ''
    --address, -a     Account address
    --input, -i       Function parameters as name:value,...
                      Array values must be specified as [item,...]. Spaces are not
                      allowed. If value contains spaces or special symbols "[],:"
                      it must be enclosed in "" or ''
    --prevent-ui, -p  Prevent user interaction
                      Useful in shell scripting e.g. on server or in some
                      automating to disable waiting for the user input.
                      Instead everdev will abort with error.
                      For example when some parameters are missing in command line
                      then ton dev will prompt user to input values for missing
                      parameters (or fails if prevent-ui option is specified).
```

#### Top up contract balance from giver
If you have set a giver for a network, you can top up contract balances on it with the following command.

```
everdev contract topup abi_filename
```

Defalt signer and giver parameters will be used, unless otherwise specified through the following options:

```
$ everdev contract topup -h
EverDev Version: 0.5.0
Use: everdev contract topup file [options]
Args:
    file  ABI file
Options:
    --help, -h     Show command usage
    --address, -a  Account address
    --network, -n  Network name
    --signer, -s   Signer key name
    --data, -d     Deploying initial data as name:value,...
                   This data is required to calculate the account address and to
                   deploy contract.
                   Array values must be specified as [item,...]. Spaces are not
                   allowed. If value contains spaces or special symbols "[],:"
                   it must be enclosed in "" or ''
    --value, -v    Deploying balance value in nano tokens
```

To **top up any known address** without providing keys or contract files, use the following command:

```
everdev contract topup --address <address>
```

or

```
everdev ct -a <addrress>
```


### DeBrowser
[The ExtraTON DeBot Browser](https://github.com/extraton/debrowser/).

#### Version
This command shows the list of available versions.

```shell
everdev debrowser version

Available Versions: 1.1.0, 1.2.0, 1.2.1, 1.3.1
```

#### Interfaces
This command shows the list of implemented interfaces.

```shell
everdev debrowser interfaces

Realised interfaces:
 - Address Input
 - Amount Input
 - Confirm Input
 - Menu
 - Network
 - Number Input
 - QR Code
 - Signing Box Input
 - Terminal
 - User Info
```

#### Start
This command downloads image and starts DeBrowser container (Docker must be launched).

```shell
everdev debrowser start 1.3.1
```

#### Stop
This command stops DeBrowser container.

```shell
everdev debrowser stop
```


## View controller info

This command displays a summary of all controller configurations.

```
everdev info
```
Output example:

$ everdev info

```
C++ compiler

Component  Version  Available
---------  -------  ---------
clang      7.0.0    7.0.0

Solidity Compiler

Component  Available
---------  ----------------------------------------------
compiler   0.42.0, 0.41.0, 0.40.0, 0.39.0, 0.38.2, 0.38.1
linker     0.3.0, 0.1.0
stdlib     0.42.0, 0.41.0, 0.40.0, 0.39.0, 0.38.2, 0.38.1

TON OS SE

Instance  State          Version  GraphQL Port  Docker Container      Docker Image
--------  -------------  -------  ------------  --------------------  -----------------------
default   not installed  0.27     80            tonlabs-tonos-se-test  tonlabs/local-node:0.27

Network Registry

Network        Endpoints                                        Giver
-------------  -----------------------------------------------  ------------------------------------------------------------------
se             http://localhost                                 0:b5e9240fc2d2f1ff8cbb1d1dee7fb7cae155e5f6320e585fcc685698994a19a5
dev (Default)  net.ton.dev, net1.ton.dev, net5.ton.dev          0:255a3ad9dfa8aa4f3481856aafc7d79f47d50205190bd56147138740e9b177f3
main           main.ton.dev, main2.ton.dev, main3.ton.dev, ...

Signer Registry

Signer          Public Key
--------------  ----------------------------------------------------------------
surf            8534c46f7a135058773fa1298cb3a299a5ddd40dafe41cb06c64f274da360bfb
test (Default)  ad4bf7bd8da244932c52127a943bfa9217b6e215c1b3307272283c4d64f34486
test2           5c2e348c5caeb420a863dc5e972f897ebe5ee899a6ef2a8299aac352eca4380a

TON OS CLI

Component  Version  Available
---------  -------  --------------------------------------------------------------------------------
tonoscli   0.11.3   0.11.4, 0.11.3, 0.11.2, 0.11.1, 0.11.0, 0.10.1, 0.10.0, 0.9.2, 0.9.1, 0.9.0, ...
```

## Working with DevNet

Read how to deploy and configure your own Giver in DevNet in a separated guide: [Working with DevNet](docs/work_with_devnet.md).

## EverDev Extensibility

TON Dev Environment is an integration point for development tools related to Everscale Blockchain.

There are two kind of software connected to EverDev:

- Development tools such as a compilers, networks, debuggers and so on.
- User Interaction services such as an IDE plugins, CLI, GUI applications etc.

Learn more about creating your own controller: [Creating Controller](docs/creating_controller.md)

## Troubleshooting

If you encountered any problem try to seek the solution in [Troubleshooting Notes](docs/troubleshooting.md). If it didn't help - please, ask in our [telegram channel](https://t.me/ton_sdk).
