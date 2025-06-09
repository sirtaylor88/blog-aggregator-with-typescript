import { exit } from 'node:process';
import { createFeed, Feed } from '../../lib/db/queries/feeds';
import { User } from '../../lib/db/queries/users';
import { createFeedFollow } from '../../lib/db/queries/feed_follows';

function printFeed(feed: Feed, user: User) {
    console.log(`${user.name}: ${feed.name} (${feed.url})`);
}

export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]): Promise<void> {
    if (args.length < 2) {
        console.log('Need both feed parameters: <name> & <url> !');
        exit(1);
    }

    const feed = await createFeed(args[0], args[1], user);
    await createFeedFollow(feed, user);
    printFeed(feed, user);

    exit(0);
}
