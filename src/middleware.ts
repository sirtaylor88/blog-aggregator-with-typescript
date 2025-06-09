import { UserCommandHandler } from "./commands";
import { readConfig } from "./config";
import { getUser } from "./lib/db/queries/users";


export function middlewareLoggedIn(handler: UserCommandHandler) {
    return async (cmdName: string, ...args: string[]): Promise<void> => {
        const cfg = readConfig();
        const userName = cfg.currentUserName;
        if (!userName) {
            throw new Error("User not logged in");
        }

        const user = await getUser(userName);
        if (!user) {
            throw new Error(`User ${userName} not found`);
        }

        await handler(cmdName, user, ...args);
    }
}
