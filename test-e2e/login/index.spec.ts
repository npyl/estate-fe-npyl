import { test } from "@playwright/test";
import fillAndExpect from "../_util/fillAndExpect";
import {
    EMAIL_ID,
    PSSWD_ID,
    SUBMIT_ID,
} from "../../src/sections/Login/constants";
import { DASHBOARD_ID } from "../../src/sections/dashboard/constants";
import { getLocalCredentials } from "../_util/getCredentials";
import gotoSafe from "../_util/gotoSafe";

const SEARCH_DEEPER = true;

test.beforeEach(async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);
    await gotoSafe(page, "http://127.0.0.1:3000/login");
});

/**
 * Test Login Page's ability to actually login!
 */
test("Login", async ({ page }) => {
    test.setTimeout(6 * 60 * 1000);

    // Clear localStorage to force manual login
    await page.evaluate(() => {
        localStorage.clear();
    });

    // Reload to ensure the cleared state takes effect
    await page.reload();

    const { username, password } = getLocalCredentials();

    await fillAndExpect(page, EMAIL_ID, username, SEARCH_DEEPER);
    await fillAndExpect(page, PSSWD_ID, password, SEARCH_DEEPER);

    await page.getByTestId(SUBMIT_ID).click();

    await page.getByTestId(DASHBOARD_ID).waitFor({
        state: "visible",
        timeout: 2 * 60 * 1000,
    });
});

/**
 * Test Login Page's ability to automatically redirect to / (dashboard) after it realises there is already a valid authenticated user
 */
test("Login (Already Logged In)", async ({ page }) => {
    test.setTimeout(6 * 60 * 1000);

    await page.getByTestId(DASHBOARD_ID).waitFor({
        state: "visible",
        timeout: 2 * 60 * 1000,
    });
});
