import path from "node:path";

const STORAGE_DIR = ".pp-persistent";

const TOKEN_FILE_PATH = path.join(
    process.cwd(),
    STORAGE_DIR,
    "refresh_tokens.json"
);

export { TOKEN_FILE_PATH };
