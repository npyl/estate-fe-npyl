import path from "path";
import fs from "fs";
import gotoSafe from "../../_util/gotoSafe";
import getCredentials from "../../_util/getCredentials";
import login from "./login";
import isntTokenExpired from "./isntTokenExpired";
import { Page } from "@playwright/test";
import getProfile from "./getProfile";

const authFile = path.join(global.projectRoot, "playwright/.auth/user.json");

const localhost = "http://127.0.0.1:3000";

const prepareLocalAuth = async (page: Page): Promise<[string, number]> => {
    let accessToken = "";

    // Check if auth file already exists & token hasn't expired
    if (fs.existsSync(authFile)) {
        accessToken = await isntTokenExpired(authFile);
    } else {
        // Get (private) credentials for tester user
        const CREDENTIALS = getCredentials();

        const token = await login(CREDENTIALS);
        if (!token) throw "Did not receive a token!";

        // Navigate to your app and wait for it to load
        await gotoSafe(page, localhost);

        // Set the accessToken in localStorage
        await page.addInitScript((token) => {
            localStorage.setItem("accessToken", token);
        }, token);

        // Reload the page to ensure the token is set
        await page.reload();

        // Save authenticated state
        console.log("Storing token");
        await page.context().storageState({ path: authFile });
    }

    const id = (await getProfile(accessToken)) ?? -1;

    return [accessToken, id] as const;
};

export default prepareLocalAuth;
