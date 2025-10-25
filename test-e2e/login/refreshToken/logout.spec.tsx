import { Page, test, expect } from "@playwright/test";
import gotoSafe from "../../_util/gotoSafe";

import login from "../_shared/login";
import {
    PAGE_URL,
    REFRESH_URL,
    SHOULD_STAY_UNAUTHORIZED,
    URL0,
    URL1,
} from "./constants";
import { EMAIL_ID, PSSWD_ID } from "../../../src/sections/Login/constants";
import {
    monitorResponses,
    openHiddenQueriesView,
    responses200,
    responses400,
    responses401,
    setupGetNewTokensToFail,
    setupGetNewTokensToSucceed,
    setupQueriesToFullfillWithStatus,
} from "./util";

// -----------------------------------------------------------------------------------------------------------------

const expectLoginPage = async (page: Page) => {
    await page.getByTestId(PSSWD_ID).waitFor({ state: "visible" });
    await page.getByTestId(EMAIL_ID).waitFor({ state: "visible" });
};

// -----------------------------------------------------------------------------------------------------------------

test.describe("RefreshToken Flows (Logout)", () => {
    test.beforeEach(async ({ page }) => {
        // INFO: prevent "Error: page.evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document."
        await gotoSafe(page, "http://127.0.0.1:3000/");
        await monitorResponses(page);
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

        // Flow Goes as follows:
        // 1. URL0, URL1 give 401 (or 403)
        expect(responses401?.at(0)).toContain(URL0);
        expect(responses401?.at(1)).toContain(URL1);
        // 2. Successful refresh happens (with 200)
        expect(responses200?.at(0)).toContain(REFRESH_URL);
        // 3. URL0 re-runs but for some reason (lets say!) it gives 401 (or 403) which is enough to cause a logout
        expect(responses401?.at(2)).toContain(URL0);

        // Test lengths
        expect(responses200.length).toBe(1);
        expect(responses401.length).toBe(3);
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

        // Test lengths
        // 1. URL0, URL1 give 401 (or 403)
        expect(responses401?.at(0)).toContain(URL0);
        expect(responses401?.at(1)).toContain(URL1);
        // 2. Unsuccessful refresh happens (with 400)
        expect(responses400?.at(0)).toContain(REFRESH_URL);
        // (redirect to login must happen and requests are not re-tried)

        // Test lengths
        expect(responses401.length).toBe(2);
        expect(responses200?.length).toBe(0);
        expect(responses400.length).toBe(1);
    });
});
