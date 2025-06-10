import { db } from "..";
import { feedFollows, feeds, users } from "../schema";
import { Feed } from "./feeds";
import { User } from "./users";
import { and, eq, getTableColumns} from 'drizzle-orm';


export type FeedFellow = typeof feedFollows.$inferSelect & {
    feedName: string;
    userName: string;
}

export async function createFeedFollow(feed: Feed, user: User): Promise<FeedFellow> {
    await db.insert(feedFollows).values({ feedId: feed.id, userId: user.id });

    const [result] = await db.select({
        ...getTableColumns(feedFollows),
        feedName: feeds.name,
        userName: users.name
    }).from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(
        and(
            eq(feedFollows.userId, user.id),
            eq(feedFollows.feedId, feed.id)
        )
    );

    return result;
}


export async function getFeedFollowsForUser(user: User): Promise<FeedFellow[]> {
    return await db.select({
        ...getTableColumns(feedFollows),
        feedName: feeds.name,
        userName: users.name
    }).from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.userId, user.id));
}


export async function deleteFeedFollowForUser(feed: Feed, user: User): Promise<void> {
    await db.delete(feedFollows).where(
        and(
            eq(feedFollows.userId, user.id),
            eq(feedFollows.feedId, feed.id)
        )
    )
}
