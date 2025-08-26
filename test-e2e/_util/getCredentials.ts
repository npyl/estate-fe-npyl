import path from "path";
import fs from "fs";

const privFile = path.join(global.projectRoot, "playwright/.auth/priv.json");

const CREDENTIALS_ERROR =
    "Username or password not found in credentials file! Please fill-in credentials in playwright/.auth/priv.json";

type TCredential = { username: string; password: string };
type TCredentials = {
    local: TCredential;
    GoogleOAuth: TCredential;
};

const getCredentials = (): TCredentials => {
    const credentialsData = fs.readFileSync(privFile, "utf8");
    return JSON.parse(credentialsData);
};

const getLocalCredentials = (): TCredential => {
    const credentials = getCredentials();
    if (!("local" in credentials)) throw "Local is not a field in credentials";

    const { username, password } = credentials.local;
    if (!username || !password) throw new Error(CREDENTIALS_ERROR);

    return { username, password };
};
const getGoogleOAuthCredentials = (): TCredential => {
    const credentials = getCredentials();
    if (!("GoogleOAuth" in credentials))
        throw "GoogleOAuth is not a field in credentials";

    const { username, password } = credentials.GoogleOAuth;
    if (!username || !password) throw new Error(CREDENTIALS_ERROR);

    return { username, password };
};

export type { TCredential };
export { getLocalCredentials, getGoogleOAuthCredentials };
