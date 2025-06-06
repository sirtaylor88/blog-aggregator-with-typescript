import { exit } from 'node:process';
import { deleteUsers } from "../lib/db/queries/users.js";


export async function handlerReset(cmdName: string, ...args: string[]): Promise<void> {
    await deleteUsers();
    exit(0);
}
