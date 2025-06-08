import { exit } from 'node:process';
import { getFeeds } from '../lib/db/queries/feeds';

export async function handlerFeeds(cmdName: string, ...args: string[]): Promise<void> {

    const feeds = await getFeeds();

    for (const feed of feeds) {
        console.log(`${feed.name} (${feed.url}) by ${feed.userName}`);
    }

    exit(0);
}
