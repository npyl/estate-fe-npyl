import { Page, test } from "@playwright/test";
import gotoSafe from "../../_util/gotoSafe";

import login from "../_shared/login";
import { PAGE_URL, SHOULD_STAY_UNAUTHORIZED } from "./constants";
import { EMAIL_ID, PSSWD_ID } from "../../../src/sections/Login/constants";
import {
    openHiddenQueriesView,
    setupGetNewTokensToFail,
    setupGetNewTokensToSucceed,
    setupQueriesToFullfillWithStatus,
} from "./util";

const expectLoginPage = async (page: Page) => {
    await page.getByTestId(PSSWD_ID).waitFor({ state: "visible" });
    await page.getByTestId(EMAIL_ID).waitFor({ state: "visible" });
};

test.describe("RefreshToken Flows (Logout)", () => {
    test.beforeEach(async ({ page }) => {
        // INFO: prevent "Error: page.evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document."
        await gotoSafe(page, "http://127.0.0.1:3000/");
    });

    test("AccessToken Expires -> Refreshing Tokens (SUCCESS) -> Re-evaluated requests (FAILURE) -> logout", async ({
        page,
    }) => {
        test.setTimeout(5 * 60 * 1000);

        // Force a brand-new session for token validity
        await login(page);

        // Navigate to PAGE_URL & wait for all network operations to finish
        await gotoSafe(page, PAGE_URL);

        await setupQueriesToFullfillWithStatus(page, 401);
        await setupGetNewTokensToSucceed(page, SHOULD_STAY_UNAUTHORIZED);

        // Now click toggle to trigger the queries
        await openHiddenQueriesView(page);

        // Check whether /login *actually* loaded
        await expectLoginPage(page);
    });

    test("AccessToken Expires -> Refreshing Tokens (FAILURE) -> Logout", async ({
        page,
    }) => {
        test.setTimeout(5 * 60 * 1000);

        // Force a brand-new session for token validity
        await login(page);

        // Navigate to PAGE_URL & wait for all network operations to finish
        await gotoSafe(page, PAGE_URL);

        await setupQueriesToFullfillWithStatus(page, 401);
        await setupGetNewTokensToFail(page);

        // Now click toggle to trigger the queries
        await openHiddenQueriesView(page);

        // Check whether /login *actually* loaded
        await expectLoginPage(page);
    });
});
