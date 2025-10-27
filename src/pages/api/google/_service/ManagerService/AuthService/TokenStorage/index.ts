import { storeCreate, storeExists, storeRead, storeWrite } from "./store";
import { Store, StoredToken } from "./types";
import { getServiceLogger } from "@/pino";

const storageLog = getServiceLogger("TokenStorage");

interface GetAllTokensRes {
    tokens: StoredToken[];
    store: Store;
}

class TokenStorage {
    /**
     * Create storage file structure
     */
    async initialize() {
        const exists = await storeExists();
        if (!exists) return await storeCreate();
        return true;
    }

    async getAllTokens(domain: string): Promise<GetAllTokensRes> {
        const store = await storeRead();
        try {
            const tokens = store?.[domain] ?? [];
            return { tokens, store };
        } catch (ex) {
            storageLog.error(ex, "getAllTokens");
            return { tokens: [], store: {} };
        }
    }

    async getToken(
        domain: string,
        userId: number
    ): Promise<StoredToken | undefined> {
        const { tokens } = await this.getAllTokens(domain);
        return tokens.find((t) => t.userId === userId);
    }

    /**
     * Save token (or update if necessary)
     * @param userId
     * @param token
     */
    async saveToken(domain: string, token: StoredToken): Promise<boolean> {
        const { tokens, store } = await this.getAllTokens(domain);

        try {
            const idx = tokens.findIndex((t) => t.userId === token.userId);

            if (idx >= 0) {
                tokens[idx] = token;
            } else {
                tokens.push(token);
            }

            const newStore = { ...store, [domain]: tokens };

            return await storeWrite(newStore);
        } catch (ex) {
            storageLog.error(ex, "saveToken");
            return false;
        }
    }

    async deleteToken(domain: string, userId: number): Promise<boolean> {
        const { tokens, store } = await this.getAllTokens(domain);

        try {
            const filteredTokens = tokens.filter((t) => t.userId !== userId);

            const newStore = { ...store, [domain]: filteredTokens };

            return await storeWrite(newStore);
        } catch (ex) {
            storageLog.error(ex, "deleteToken");
            return false;
        }
    }

    async deleteAllTokens(domain: string) {
        const store = await storeRead();
        const newStore = { ...store, [domain]: [] };
        return storeWrite(newStore);
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

export type { GetAllTokensRes };
export default tokenService;
