import { handlerLogin } from "./command_login.js";


export type CommandHandler = (cmdName: string, ...args: string[]) => void;
export type CommandsRegistry = {
    [key: string]: CommandHandler;
}

export function registerCommand(
    registry: CommandsRegistry, cmdName: string, handler: CommandHandler
): void {
    registry[cmdName] = handler;
}

export function runCommand(
    registry: CommandsRegistry, cmdName: string, ...args: string[]
): void {
    if (!(cmdName in registry)) {
       throw new Error('Invalid command!');
    }

    registry[cmdName](cmdName, ...args);
}

export const commands: CommandsRegistry = {
    "login": handlerLogin
}
