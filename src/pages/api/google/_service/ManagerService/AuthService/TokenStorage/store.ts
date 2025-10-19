import fs from "node:fs/promises";
import path from "node:path";
import { TOKEN_FILE_PATH } from "./constants";
import { Store } from "./types";

const storeCreate = async () => {
    try {
        const directory = path.dirname(TOKEN_FILE_PATH);
        await fs.mkdir(directory, { recursive: true });
        return await storeWrite({});
    } catch {
        return false;
    }
};

const storeExists = async () => {
    try {
        await fs.access(TOKEN_FILE_PATH);
        return true;
    } catch {
        return false;
    }
};

const storeRead = async (): Promise<Store> => {
    try {
        const data = await fs.readFile(TOKEN_FILE_PATH, "utf-8");
        const res = JSON.parseSafe<Store>(data);
        if (!res) throw new Error("Parsing store fail");
        return res;
    } catch {
        return {};
    }
};

const storeWrite = async (data: Store) => {
    try {
        await fs.writeFile(TOKEN_FILE_PATH, JSON.stringify(data, null, 2));
        return true;
    } catch {
        return false;
    }
};

export {
    storeCreate,
    // ...
    storeExists,
    // ...
    storeRead,
    storeWrite,
};
