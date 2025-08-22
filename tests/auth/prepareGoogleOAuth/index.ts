import readToken from "../prepareLocalAuth/util/readToken";
import isOAuthAuthenticated from "./authenticate/isOAuthAuthenticated";
import getProfileId from "../prepareLocalAuth/service/getProfileId";
import authenticate from "./authenticate";
import { chromium } from "@playwright/test";
import { test } from "@playwright/experimental-ct-react";

const prepareGoogleOAuth = async () => {
    const token = await readToken();
    if (!token) throw "This shouldnt happen";

    const id = await getProfileId(token);
    const isAuthenticated = await isOAuthAuthenticated(token, id);

    // INFO: early return; we have everything we need!
    if (isAuthenticated) {
        console.log("GoogleAuth: already authenticated");
        return;
    }

    // Open headed browser session
    test.setTimeout(5 * 60 * 1000);
    const headedBrowser = await chromium.launch({ headless: false });
    const context = await headedBrowser.newContext();
    const headedPage = await context.newPage();

    await authenticate(headedPage, id);

    await headedBrowser.close();
};

export default prepareGoogleOAuth;
