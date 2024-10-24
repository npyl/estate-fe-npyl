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

    async initialize(): Promise<void> {
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
        } catch (error) {
            console.error("Failed to initialize token storage:", error);
            throw new Error("Failed to initialize token storage");
        }
    }

    async getAllTokens(): Promise<StoredToken[]> {
        try {
            const data = await fs.readFile(this.tokenFilePath, "utf-8");
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    async getToken(userId: number): Promise<string | null> {
        try {
            const tokens = await this.getAllTokens();
            const userToken = tokens.find((t) => t.userId === userId);
            return userToken?.refreshToken || null;
        } catch (error) {
            console.error("Failed to get token:", error);
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
        } catch (error) {
            console.error("Failed to save token:", error);
            throw new Error("Failed to save token");
        }
    }

    async deleteToken(userId: number): Promise<void> {
        try {
            const tokens = await this.getAllTokens();
            const filteredTokens = tokens.filter((t) => t.userId !== userId);
            await fs.writeFile(
                this.tokenFilePath,
                JSON.stringify(filteredTokens, null, 2)
            );
        } catch (error) {
            console.error("Failed to delete token:", error);
            throw new Error("Failed to delete token");
        }
    }
}
