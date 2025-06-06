import { db } from "..";
import { users } from "../schema";
import { eq } from 'drizzle-orm';

export async function createUser(name: string) {
    const [result] = await db.insert(users).values({ name: name }).returning();
    return result;
}

export async function getUser(name: string) {
    const results = await db.select().from(users).where(eq(users.name, name));
    if (results.length === 0) {
        return;
    }
    return results[0];
}

export async function deleteUsers() {
    await db.delete(users);
}
