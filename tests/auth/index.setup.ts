import { test as setup } from "@playwright/test";
import prepareLocalAuth from "./prepareLocalAuth";

setup("authenticate", async ({ page }) => {
    await prepareLocalAuth(page);
});
