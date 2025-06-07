import { db } from "..";
import { users } from "../schema";
import { eq } from 'drizzle-orm';

export type User = typeof users.$inferSelect;

export async function createUser(name: string): Promise<User> {
    const [result] = await db.insert(users).values({ name: name }).returning();
    return result;
}

export async function getUsers(): Promise<User[]> {
    const results = await db.select().from(users);
    return results;
}

export async function getUser(name: string): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.name, name));
    if (results.length === 0) {
        return;
    }
    return results[0];
}

export async function deleteUsers(): Promise<void> {
    await db.delete(users);
}
