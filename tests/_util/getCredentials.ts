import path from "path";
import fs from "fs";

const privFile = path.join(global.projectRoot, "playwright/.auth/priv.json");

const CREDENTIALS_ERROR =
    "Username or password not found in credentials file! Please fill-in credentials in playwright/.auth/priv.json";

type TCredentials = { username: string; password: string };

const getCredentials = (): TCredentials => {
    console.log("PRIV: ", privFile);

    let credentials;

    const credentialsData = fs.readFileSync(privFile, "utf8");
    credentials = JSON.parse(credentialsData);

    const { username, password } = credentials;
    if (!username || !password) throw new Error(CREDENTIALS_ERROR);

    return { username, password };
};

export type { TCredentials };
export default getCredentials;
