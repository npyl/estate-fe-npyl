import gotoSafe from "../../_util/gotoSafe";
import { getLocalCredentials } from "../../_util/getCredentials";
import login from "./service/login";
import { Page } from "@playwright/test";
import { AUTH_FILE } from "./_constant";

const localhost = "http://127.0.0.1:3000";

const authenticate = async (page: Page) => {
    // Get (private) credentials for tester user
    const CREDENTIALS = getLocalCredentials();

    const accessToken = await login(CREDENTIALS);
    if (!accessToken) throw "Did not receive a token!";

    // Navigate to your app and wait for it to load
    await gotoSafe(page, localhost);

    // Set the accessToken in localStorage
    await page.addInitScript((token) => {
        localStorage.setItem("accessToken", token);
    }, accessToken);

    // Reload the page to ensure the token is set
    await page.reload();

    // Save authenticated state
    console.log("Storing token");
    await page.context().storageState({ path: AUTH_FILE });
};

export default authenticate;
