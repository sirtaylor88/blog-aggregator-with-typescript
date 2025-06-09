import { exit } from 'node:process';
import { getUsers } from "../lib/db/queries/users.js";
import { readConfig } from '../config.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function handlerUsers(cmdName: string, ...args: string[]): Promise<void> {
    const cfg = readConfig();
    const users = await getUsers();
    for (const user of users) {
        let suffix = ""
        if (cfg.currentUserName === user.name) {
            suffix = " (current)";
        }
        console.log(`- '${user.name}${suffix}'`);
    }
    exit(0);
}
