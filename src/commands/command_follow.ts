import { exit } from 'node:process';
import { readConfig } from '../config';
import { getUser } from '../lib/db/queries/users';
import { createFeedFollow } from '../lib/db/queries/feed_follows';
import { getFeed } from '../lib/db/queries/feeds';

export async function handlerFollow(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length == 0) {
        console.log('Missing url!');
        exit(1);
    }

    const cfg = readConfig();
    const userName = cfg.currentUserName;
    const user = await getUser(userName);

    if (!user) {
        throw new Error(`User ${userName} not found`);
    }

    const feed = await getFeed(args[0]);
    if (!feed) {
        console.log('Unknown feed!')
        exit(1);
    }
    const feedFollow = await createFeedFollow(feed, user);
    console.log(`${feedFollow.userName} is following ${feedFollow.feedName}!`);
    exit(0);
}
