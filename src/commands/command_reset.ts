import { exit } from 'node:process';
import { deleteUsers } from "../lib/db/queries/users.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function handlerReset(cmdName: string, ...args: string[]): Promise<void> {
    await deleteUsers();
    exit(0);
}
