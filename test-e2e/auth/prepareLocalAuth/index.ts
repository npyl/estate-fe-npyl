import fs from "node:fs";
import readToken from "./util/readToken";
import isTokenExpired from "./util/isTokenExpired";
import { Page } from "@playwright/test";
import authenticate from "./authenticate";
import { AUTH_FILE } from "./_constant";

const prepareLocalAuth = async (page: Page) => {
    // Auth file already exists; check if token is valid and not expired
    if (fs.existsSync(AUTH_FILE)) {
        const token = await readToken();

        // we didn't find a token record; authenticate
        if (!token) {
            await authenticate(page);
        }
        // we found a token record but it was expired; authenticate
        else if (await isTokenExpired(token)) {
            await authenticate(page);
        } else {
            // we found a token and it is valid and non-expired; continue!
        }
    }
    // we didn't find an auth record
    else {
        await authenticate(page);
    }
};

export default prepareLocalAuth;
