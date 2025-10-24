import { test } from "@playwright/test";
import { DASHBOARD_ID } from "../../src/sections/dashboard/constants";
import gotoSafe from "../_util/gotoSafe";
import login from "./_shared/login";

test.beforeEach(async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);
    await gotoSafe(page, "http://127.0.0.1:3000/login");
});

/**
 * Test Login Page's ability to actually login!
 */
test("Login", async ({ page }) => {
    test.setTimeout(6 * 60 * 1000);
    await login(page);
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

test.fixme(
    "Login (Already Logged In but from different browser)",
    async ({ page }) => {}
);
