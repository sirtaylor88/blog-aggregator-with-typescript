import { db } from "..";
import { feeds, users } from "../schema";
import { User } from "./users";
import { eq } from 'drizzle-orm';

export type Feed = typeof feeds.$inferSelect;

export type FeedWithUserName = {
    name: string;
    url: string;
    userName: string
}

export async function getFeeds(): Promise<FeedWithUserName[]> {
    return await db.select({
      name: feeds.name,
      url: feeds.url,
      userName: users.name,
    }).from(feeds).innerJoin(users, eq(feeds.userId, users.id))
}

export async function createFeed(name: string, url: string, user: User): Promise<Feed> {
    const [result] = await db.insert(feeds).values({ name: name, url: url, userId: user.id }).returning();
    return result;
}
