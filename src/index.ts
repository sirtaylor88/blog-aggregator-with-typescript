import { handlerAddFeed } from "./commands/feeds/command_add_feed.js";
import { handlerAggregate } from "./commands/feeds/command_aggregate.js";
import { handlerFeeds } from "./commands/feeds/command_feeds.js";
import { handlerFollow } from "./commands/follows/command_follow.js";
import { handlerFollowing } from "./commands/follows/command_followings.js";
import { handlerLogin } from "./commands/auth/command_login.js";
import { handlerRegister } from "./commands/auth/command_register.js";
import { handlerReset } from "./commands/db/command_reset.js";
import { handlerUsers } from "./commands/command_users.js";
import { CommandsRegistry, registerCommand, runCommand } from "./commands.js";
import { argv, exit } from 'node:process';
import { middlewareLoggedIn } from "./middleware.js";
import { handlerUnfollow } from "./commands/follows/command_unfollow.js";
import { handlerBrowse } from "./commands/posts/command_browse.js";

async function main() {
    if (argv.length < 3) {
        console.log("Missing command!");
        exit(1);
    }

    const registryCommand: CommandsRegistry = {}
    registerCommand(registryCommand, 'addfeed', middlewareLoggedIn(handlerAddFeed));
    registerCommand(registryCommand, 'agg', handlerAggregate);
    registerCommand(registryCommand, 'browse', middlewareLoggedIn(handlerBrowse));
    registerCommand(registryCommand, 'feeds', handlerFeeds);
    registerCommand(registryCommand, 'follow', middlewareLoggedIn(handlerFollow));
    registerCommand(registryCommand, 'following', middlewareLoggedIn(handlerFollowing));
    registerCommand(registryCommand, 'login', handlerLogin);
    registerCommand(registryCommand, 'register', handlerRegister);
    registerCommand(registryCommand, 'reset', handlerReset);
    registerCommand(registryCommand, 'unfollow', middlewareLoggedIn(handlerUnfollow));
    registerCommand(registryCommand, 'users', handlerUsers);


    const command = argv[2];
    const args = argv.slice(3);
    runCommand(registryCommand, command, ...args);
}

main();
