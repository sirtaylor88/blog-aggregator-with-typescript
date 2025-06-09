import { exit } from 'node:process';
import { readConfig } from '../config';
import { getUser } from '../lib/db/queries/users';
import { getFeedFollowsForUser } from '../lib/db/queries/feed_follows';

export async function handlerFollowing(cmdName: string, ...args: string[]): Promise<void> {
    const cfg = readConfig();
    const userName = cfg.currentUserName;
    const user = await getUser(userName);

    if (!user) {
        throw new Error(`User ${userName} not found`);
    }

    const feedFollows = await getFeedFollowsForUser(user);
    console.log(`You followed ${feedFollows.length} feeds.`)
    for (const feedFollow of feedFollows) {
        console.log(`- ${feedFollow.feedName}`);
    }
    exit(0);
}
