import gotoSafe from "../../_util/gotoSafe";
import { getLocalCredentials } from "../../_util/getCredentials";
import login from "./service/login";
import { Page } from "@playwright/test";
import { AUTH_FILE } from "./_constant";
import { accessTokenKey, refreshTokenKey } from "../../../src/constants";

const localhost = "http://127.0.0.1:3000";

// ------------------------------------------------------------------------

interface ScriptData {
    accessTokenKey: string;
    refreshTokenKey: string;
    token: string;
    refreshToken: string;
}

const initScript = ({
    accessTokenKey,
    token,
    // ...
    refreshTokenKey,
    refreshToken,
}: ScriptData) => {
    // IMPORTANT: this call is supposed to run on the browser; therefore, setItem() needs to run on globalThis.window.locaStorage! If you write just localStorage it will not work!
    globalThis.window.localStorage.setItem(accessTokenKey, token);
    globalThis.window.localStorage.setItem(refreshTokenKey, refreshToken);
};

// ------------------------------------------------------------------------

const authenticate = async (page: Page) => {
    // Get (private) credentials for tester user
    const CREDENTIALS = getLocalCredentials();

    const data = await login(CREDENTIALS);
    const { token, refreshToken } = data || {};
    if (!token) throw new Error("Did not receive a token!");
    if (!refreshToken) throw new Error("Did not receive a refreshToken!");

    // Navigate to your app and wait for it to load
    await gotoSafe(page, localhost);

    // Set the accessToken in localStorage
    await page.addInitScript(initScript, {
        token,
        accessTokenKey,
        refreshToken,
        refreshTokenKey,
    });

    // Reload the page to ensure the token is set
    await page.reload();

    // Save authenticated state
    console.log("Storing token");
    await page.context().storageState({ path: AUTH_FILE });
};

export default authenticate;
