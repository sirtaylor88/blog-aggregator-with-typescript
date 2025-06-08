import { exit } from 'node:process';
import { createFeed, Feed } from '../lib/db/queries/feeds';
import { getUser, User } from '../lib/db/queries/users';
import { readConfig } from '../config';

function printFeed(feed: Feed, user: User) {
    console.log(`${user.name}: ${feed.name} (${feed.url})`);
}

export async function handlerAddFeed(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length < 2) {
        console.log('Need both feed parameters: <name> & <url> !');
        exit(1);
    }

    const cfg = readConfig()

    const user = await getUser(cfg.currentUserName);

    if (user === undefined) {
        console.log('Action needs login!')
        exit(1);
    }

    const feed = await createFeed(args[0], args[1], user);
    printFeed(feed, user);

    exit(0);
}
