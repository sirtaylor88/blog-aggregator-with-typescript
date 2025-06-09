import { exit } from 'node:process';
import { readConfig } from '../config';
import { getUser, User } from '../lib/db/queries/users';
import { createFeedFollow } from '../lib/db/queries/feed_follows';
import { getFeed } from '../lib/db/queries/feeds';

export async function handlerFollow(cmdName: string, user: User, ...args: string[]): Promise<void> {
    if (args.length == 0) {
        console.log('Missing url!');
        exit(1);
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
