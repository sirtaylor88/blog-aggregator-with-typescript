/* eslint-disable  @typescript-eslint/no-explicit-any */
import fs from 'node:fs';
import os from 'node:os';
import path from "node:path";

export type Config = {
    dbUrl: string;
    currentUserName: string;
}

function getConfigFilePath(): string {
    return path.join(os.homedir(), '.gatorconfig.json');
}

function writeConfig(cfg: Config): void {
    const filePath = getConfigFilePath();
    const rawConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName
    }
    const data = JSON.stringify(rawConfig, null, 2);
    fs.writeFileSync(filePath, data, { encoding: "utf-8" });
}

export function setUser(user: string): void {
    const cfg = readConfig();
    cfg.currentUserName = user;
    writeConfig(cfg);
}

function validateConfig(rawConfig: any): Config {
    if (!rawConfig.db_url || typeof rawConfig.db_url !== 'string') {
        throw new Error('Invalid config!');
    }
    if (rawConfig.current_user_name && typeof rawConfig.current_user_name !== 'string') {
        throw new Error('Invalid config!');
    }

    const config: Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name || "",
    };
    return config;
}

export function readConfig(): Config {
    const filePath = getConfigFilePath();
    const data = fs.readFileSync(filePath, 'utf8');
    return validateConfig(JSON.parse(data));
}
