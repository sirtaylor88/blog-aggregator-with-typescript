import { db } from "..";
import { feeds, users } from "../schema";
import { User } from "./users";
import { eq } from 'drizzle-orm';

export type Feed = typeof feeds.$inferSelect;

export type FeedWithUserName = {
    name: string;
    url: string;
    userName: string;
}

export async function getFeeds(): Promise<FeedWithUserName[]> {
    return await db.select({
      name: feeds.name,
      url: feeds.url,
      userName: users.name,
    }).from(feeds).innerJoin(users, eq(feeds.userId, users.id));
}

export async function getFeed(url: string): Promise<Feed | undefined> {
    const results = await db.select().from(feeds).where(eq(feeds.url, url));
    if (results.length === 0) {
        return;
    }
    return results[0];
}

export async function createFeed(name: string, url: string, user: User): Promise<Feed> {
    const [result] = await db.insert(feeds).values({ name: name, url: url, userId: user.id }).returning();
    return result;
}
