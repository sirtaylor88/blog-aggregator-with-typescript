import { exit } from 'node:process';
import { createUser, getUser } from "../../lib/db/queries/users.js";
import { setUser } from '../../config.js';

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length == 0) {
        console.log('Missing username!');
        exit(1);
    }

    const user = await getUser(args[0]);
    if (!user) {
        await createUser(args[0]);
        setUser(args[0]);
        console.log('User registered successfully!');
        exit(0);
    }

    console.log('User already registered!');
    exit(1);
}
