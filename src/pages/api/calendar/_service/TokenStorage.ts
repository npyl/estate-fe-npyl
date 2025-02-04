import fs from "fs/promises";
import path from "path";

const STORAGE_DIR = ".pp-persistent";

interface StoredToken {
    userId: number;
    refreshToken: string;
}

export class TokenStorage {
    private readonly tokenFilePath: string;

    constructor() {
        this.tokenFilePath = path.join(
            process.cwd(),
            STORAGE_DIR,
            "refresh_tokens.json"
        );
    }

    async initialize() {
        try {
            // Ensure the data directory exists
            const directory = path.dirname(this.tokenFilePath);
            await fs.mkdir(directory, { recursive: true });

            // Create the file if it doesn't exist
            try {
                await fs.access(this.tokenFilePath);
            } catch {
                await fs.writeFile(this.tokenFilePath, JSON.stringify([]));
            }
        } catch (ex) {
            console.error(ex);
        }
    }

    async getAllTokens(): Promise<StoredToken[]> {
        try {
            const data = await fs.readFile(this.tokenFilePath, "utf-8");
            const res = JSON.parseSafe(data);
            if (!res) return [];
            return res;
        } catch {
            return [];
        }
    }

    async getToken(userId: number): Promise<string | null> {
        try {
            const tokens = await this.getAllTokens();
            const userToken = tokens.find((t) => t.userId === userId);
            return userToken?.refreshToken || null;
        } catch (ex) {
            console.error(ex);
            return null;
        }
    }

    async saveToken(userId: number, refreshToken: string): Promise<void> {
        try {
            const tokens = await this.getAllTokens();
            const existingIndex = tokens.findIndex((t) => t.userId === userId);

            if (existingIndex >= 0) {
                tokens[existingIndex].refreshToken = refreshToken;
            } else {
                tokens.push({ userId, refreshToken });
            }

            await fs.writeFile(
                this.tokenFilePath,
                JSON.stringify(tokens, null, 2)
            );
        } catch (ex) {
            console.error(ex);
        }
    }

    async deleteToken(userId: number) {
        try {
            const tokens = await this.getAllTokens();
            const filteredTokens = tokens.filter((t) => t.userId !== userId);
            await fs.writeFile(
                this.tokenFilePath,
                JSON.stringify(filteredTokens, null, 2)
            );
        } catch (ex) {
            console.error(ex);
        }
    }

    async deleteAllTokens() {
        try {
            await fs.writeFile(this.tokenFilePath, JSON.stringify([], null, 2));
        } catch (ex) {
            console.error(ex);
        }
    }
}
