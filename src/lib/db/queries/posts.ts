import { db } from "..";
import { feedFollows, feeds, posts } from "../schema";
import { desc, eq, getTableColumns } from 'drizzle-orm';

export type NewPost = typeof posts.$inferInsert;
export type Post = typeof posts.$inferSelect & {
    feedName: string;
};

export async function createPost(post: NewPost): Promise<NewPost> {
    const [result] = await db.insert(posts).values(post).returning();
    return result;
}

export async function getPostsForUser(userId: string, limit: number = 2): Promise<Post[]> {
    return await db.select({
        ...getTableColumns(posts),
        feedName: feeds.name
    }).from(posts)
    .innerJoin(feedFollows, eq(posts.feedId, feedFollows.feedId))
    .innerJoin(feeds, eq(posts.feedId, feeds.id))
    .where(eq(feedFollows.userId, userId))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);
}
