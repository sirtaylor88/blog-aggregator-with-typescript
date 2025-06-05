import { commands, runCommand } from "./commands/commands.js";
import { argv, exit } from 'node:process';

async function main() {
    if (argv.length < 3) {
        console.log("Missing command!");
        exit(1);
    }

    const command = argv[2];
    const args = argv.slice(3);
    runCommand(commands, command, ...args);
}

main();
