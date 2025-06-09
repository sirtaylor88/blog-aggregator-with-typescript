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

    const cfg = readConfig()

    const user = await getUser(cfg.currentUserName);

    if (user === undefined) {
        console.log('Action needs login!')
        exit(1);
    }

    const feed = await getFeed(args[0]);
    if (feed === undefined) {
        console.log('Unknown feed!')
        exit(1);
    }
    const feedFollow = await createFeedFollow(feed, user);
    console.log(`${feedFollow.userName} is following ${feedFollow.feedName}!`);
    exit(0);
}
