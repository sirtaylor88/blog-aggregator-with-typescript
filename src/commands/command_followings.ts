import { exit } from 'node:process';
import { readConfig } from '../config';
import { getUser } from '../lib/db/queries/users';
import { getFeedFollowsForUser } from '../lib/db/queries/feed_follows';

export async function handlerFollowing(cmdName: string, ...args: string[]): Promise<void> {
    const cfg = readConfig()
    const user = await getUser(cfg.currentUserName);

    if (user === undefined) {
        console.log('Action needs login!')
        exit(1);
    }

    const feedFollows = await getFeedFollowsForUser(user);
    console.log(`You followed ${feedFollows.length} feeds.`)
    for (const feedFollow of feedFollows) {
        console.log(`- ${feedFollow.feedName}`);
    }
    exit(0);
}
