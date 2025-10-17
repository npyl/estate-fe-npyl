import fs from "node:fs/promises";
import path from "node:path";
import { TOKEN_FILE_PATH } from "./constants";
import { StoredToken } from "./types";

class TokenStorage {
    /**
     * Create storage file structure
     */
    async initialize() {
        try {
            // Ensure the data directory exists
            const directory = path.dirname(TOKEN_FILE_PATH);
            await fs.mkdir(directory, { recursive: true });

            // Create the file if it doesn't exist
            try {
                await fs.access(TOKEN_FILE_PATH);
            } catch {
                await fs.writeFile(TOKEN_FILE_PATH, JSON.stringify([]));
            }

            return true;
        } catch {
            return false;
        }
    }

    async getAllTokens(): Promise<StoredToken[]> {
        try {
            const data = await fs.readFile(TOKEN_FILE_PATH, "utf-8");
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
            return userToken?.token || null;
        } catch {
            return null;
        }
    }

    /**
     * Save token (or update if necessary)
     * @param userId
     * @param token
     */
    async saveToken(userId: number, token: string): Promise<boolean> {
        try {
            const tokens = await this.getAllTokens();
            const existingIndex = tokens.findIndex((t) => t.userId === userId);

            if (existingIndex >= 0) {
                tokens[existingIndex].token = token;
            } else {
                tokens.push({ userId, token });
            }

            await fs.writeFile(
                TOKEN_FILE_PATH,
                JSON.stringify(tokens, null, 2)
            );

            return true;
        } catch {
            return false;
        }
    }

    async deleteToken(userId: number): Promise<boolean> {
        try {
            const tokens = await this.getAllTokens();
            const filteredTokens = tokens.filter((t) => t.userId !== userId);
            await fs.writeFile(
                TOKEN_FILE_PATH,
                JSON.stringify(filteredTokens, null, 2)
            );

            return true;
        } catch {
            return false;
        }
    }

    async deleteAllTokens(): Promise<boolean> {
        try {
            await fs.writeFile(TOKEN_FILE_PATH, JSON.stringify([], null, 2));
            return true;
        } catch {
            return false;
        }
    }
}

// -----------------------------------------------------------------------------------

const TokenStorageSingleton = () => {
    return new TokenStorage();
};

declare global {
    // eslint-disable-next-line no-var
    var tokenServiceGlobal:
        | undefined
        | ReturnType<typeof TokenStorageSingleton>;
}

const tokenService = globalThis.tokenServiceGlobal ?? TokenStorageSingleton();

if (process.env.NODE_ENV !== "production")
    globalThis.tokenServiceGlobal = tokenService;

// ------------------------------------------------------------------------------

export default tokenService;
