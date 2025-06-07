import { db } from "..";
import { feeds } from "../schema";
import { User } from "./users";

export type Feed = typeof feeds.$inferSelect;

export async function createFeed(name: string, url: string, user: User): Promise<Feed> {
    const [result] = await db.insert(feeds).values({ name: name, url: url, userId: user.id }).returning();
    return result;
}
