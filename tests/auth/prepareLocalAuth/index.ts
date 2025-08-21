import path from "path";
import fs from "fs";
import readToken from "./util/readToken";
import isTokenExpired from "./util/isTokenExpired";
import { Page } from "@playwright/test";
import getProfile from "./service/getProfile";
import authenticate from "./authenticate";

const authFile = path.join(global.projectRoot, "playwright/.auth/user.json");

const prepareLocalAuth = async (page: Page): Promise<[string, number]> => {
    let accessToken = "";

    // Auth file already exists; check if token is valid and not expired
    if (fs.existsSync(authFile)) {
        let token = await readToken(authFile);

        // we didn't find a token record; authenticate
        if (!token) {
            token = await authenticate(page, authFile);
        }
        // we found a token record but it was expired; authenticate
        else if (await isTokenExpired(token)) {
            token = await authenticate(page, authFile);
        } else {
            // we found a token and it is valid and non-expired; continue!
        }

        accessToken = token;
    }
    // we didn't find an auth record
    else {
        accessToken = await authenticate(page, authFile);
    }

    const id = await getProfile(accessToken);

    return [accessToken, id] as const;
};

export default prepareLocalAuth;
