import { setUser } from "../config.js";
import { exit } from 'node:process';
import { getUser } from "../lib/db/queries/users.js";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length == 0) {
        console.log('Missing username!');
        exit(1);
    }
    const user = await getUser(args[0]);
    if (user === undefined) {
        console.log('User does not exists!');
        exit(1);
    }
    setUser(args[0]);
    console.log('Username is set!');
    exit(0);
}
