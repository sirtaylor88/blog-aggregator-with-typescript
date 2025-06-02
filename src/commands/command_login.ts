import { setUser } from "../config.js";
import { exit } from 'node:process';

export function handlerLogin(cmdName: string, ...args: string[]): void {
    if (args.length == 0) {
        console.log('Missing username!');
        exit(1);
    }
    setUser(args[0]);
    console.log('Username is set!');
    exit(0);
}
