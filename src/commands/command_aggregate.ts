import { inspect } from "node:util";
import { fetchFeed } from "../api/feed.js";
import { exit } from 'node:process';

export async function handlerAggregate(cmdName: string, ...args: string[]): Promise<void> {
    const result = await fetchFeed('https://www.wagslane.dev/index.xml');
    console.log(inspect(result, {showHidden: false, depth: null, colors: true}));
    exit(0);
}
