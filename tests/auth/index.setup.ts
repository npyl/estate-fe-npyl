import { test as setup } from "@playwright/test";
import prepareLocalAuth from "./prepareLocalAuth";
import prepareGoogleOAuth from "./prepareGoogleOAuth";

setup("authenticate", async ({ page }) => {
    await prepareLocalAuth(page);
    await prepareGoogleOAuth();
});
