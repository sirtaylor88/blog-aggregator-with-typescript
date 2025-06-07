import { handlerLogin } from "./command_login.js";
import { handlerRegister } from "./command_register.js";
import { handlerReset } from "./command_reset.js";
import { handlerUsers } from "./command_users.js";


export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;
export type CommandsRegistry = {
    [key: string]: CommandHandler;
}

export async function registerCommand(
    registry: CommandsRegistry, cmdName: string, handler: CommandHandler
): Promise<void> {
    registry[cmdName] = handler;
}

export async function runCommand(
    registry: CommandsRegistry, cmdName: string, ...args: string[]
): Promise<void> {
    if (!(cmdName in registry)) {
       throw new Error('Invalid command!');
    }

    await registry[cmdName](cmdName, ...args);
}

export const commands: CommandsRegistry = {
    'login': handlerLogin,
    'register': handlerRegister,
    'reset': handlerReset,
    'users': handlerUsers
}
