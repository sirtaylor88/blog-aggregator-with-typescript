import { fetchFeed } from "../../api/feed.js";
import { exit } from 'node:process';
import { getNextFeedToFetch, markFeedFetched } from "../../lib/db/queries/feeds.js";

async function scrapeFeeds(): Promise<void> {
    const feed = await getNextFeedToFetch();
    if (!feed) {
        return;
    }
    markFeedFetched(feed.id);
    const rssFeed = await fetchFeed(feed.url);
    console.log(`Feed ${feed.name} collected:`)
    for (const item of rssFeed.channel.item) {
        console.log(`- ${item.title}`);
    }
}

function parseDuration(durationStr: string): number {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);
    if (match) {
        const value = parseInt(match[1])
        switch (match[2]){
            case 'ms':
                return value;
            case 's':
                return value * 1000;
            case 'm':
                return value * 1000 * 60;
            case 'h':
                return value * 1000 * 60 * 60;
            default:
                throw new Error('Invalid value!');
        }
    }
    throw new Error('Invalid value!');

}

function handleError(err: unknown) {
    console.error(`Error scraping feeds: ${err instanceof Error ? err.message : err}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function handlerAggregate(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <time_between_reqs>`);
    }

    const timeBetweenRequests = parseDuration(args[0]);
    console.log(`Collecting feeds every ${args[0]}`);

    scrapeFeeds().catch(handleError);

    const interval = setInterval(() => {
        scrapeFeeds().catch(handleError);
    }, timeBetweenRequests);

    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");
            clearInterval(interval);
            resolve();
        });
    });
    exit(0);
}
