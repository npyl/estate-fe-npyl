import path from "node:path";

const AUTH_FILE = path.join(
    (global as any).projectRoot,
    "playwright/.auth/user.json"
);

export { AUTH_FILE };
