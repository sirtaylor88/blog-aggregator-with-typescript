import { exit } from 'node:process';
import { User } from '../../lib/db/queries/users';
import { getFeedFollowsForUser } from '../../lib/db/queries/feed_follows';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function handlerFollowing(cmdName: string, user: User, ...args: string[]): Promise<void> {
    const feedFollows = await getFeedFollowsForUser(user);
    console.log(`You followed ${feedFollows.length} feeds.`)
    for (const feedFollow of feedFollows) {
        console.log(`- ${feedFollow.feedName}`);
    }
    exit(0);
}
