import { exit } from 'node:process';
import { User } from '../../lib/db/queries/users';
import { deleteFeedFollowForUser } from '../../lib/db/queries/feed_follows';
import { getFeed } from '../../lib/db/queries/feeds';

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]): Promise<void> {
    if (args.length == 0) {
        console.log('Missing url!');
        exit(1);
    }

    const feed = await getFeed(args[0]);
    if (!feed) {
        console.log('Unknown feed!')
        exit(1);
    }
    const feedName = feed.name
    await deleteFeedFollowForUser(feed, user);
    console.log(`${user.name} unfollowed ${feedName}!`);
    exit(0);
}
