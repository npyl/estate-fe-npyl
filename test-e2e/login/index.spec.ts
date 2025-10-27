import { Page, test, expect } from "@playwright/test";
import gotoSafe from "../_util/gotoSafe";
import login from "./_shared/login";
import {
    PAGE_URL,
    REFRESH_URL,
    SHOULD_FULLFILL_NATURALLY,
    SHOULD_STAY_UNAUTHORIZED,
    URL0,
    URL1,
} from "./constants";
import {
    // ...
    FIRSTNAME_TESTID,
    TOTAL_TESTID,
} from "../../src/sections/__test__/RefreshToken/constants";
import {
    clearResponses,
    getResponses,
    monitorResponses,
    openHiddenQueriesView,
    setupGetNewTokensToFail,
    setupGetNewTokensToSucceed,
    setupQueriesToFullfillWithStatus,
} from "./util";
import { EMAIL_ID, PSSWD_ID } from "../../src/sections/Login/constants";
import { DASHBOARD_ID } from "../../src/sections/dashboard/constants";

// ---------------------------------------------------------------------------------------------------------

const expectLoginPage = async (page: Page) => {
    await page.getByTestId(PSSWD_ID).waitFor({ state: "visible" });
    await page.getByTestId(EMAIL_ID).waitFor({ state: "visible" });
};

// ---------------------------------------------------------------------------------------------------------

const expectFirstName = async (page: Page) => {
    const l = page.getByTestId(FIRSTNAME_TESTID);
    await l.waitFor({ state: "visible" });
    const text = await l.textContent();
    expect(text).toBeTruthy();
};
const expectTotal = async (page: Page) => {
    const l = page.getByTestId(TOTAL_TESTID);
    await l.waitFor({ state: "visible" });
    const text = await l.textContent();
    expect(text).toBeTruthy();
};

// ---------------------------------------------------------------------------------------------------------

test.describe("Login & RefreshToken flows", () => {
    // INFO: make sure these DON'T run simultaneously (I noticed individually they always pass!)
    test.describe.configure({ mode: "serial" });

    test.describe("Login", () => {
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
    });

    test.describe("RefreshToken Flows", () => {
        test.beforeEach(async ({ page }) => {
            // cleanups
            clearResponses();

            // INFO: prevent "Error: page.evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document."
            await gotoSafe(page, "http://127.0.0.1:3000");
            await monitorResponses(page);
        });

        test("AccessToken Expires -> Refreshing Tokens (SUCCESS) -> All Requests are re-evaluated", async ({
            page,
        }) => {
            test.setTimeout(5 * 60 * 1000);

            // Force a brand-new session for token validity
            await login(page);

            // Navigate FIRST, before setting up interceptors
            await gotoSafe(page, PAGE_URL);

            // THEN set up your interceptors
            await setupQueriesToFullfillWithStatus(page, 401);
            await setupGetNewTokensToSucceed(page, SHOULD_FULLFILL_NATURALLY);

            // Now click toggle to trigger the queries
            await openHiddenQueriesView(page);

            await expectFirstName(page);
            await expectTotal(page);

            const { responses401, responses200 } = getResponses();

            expect(responses401?.at(0)).toContain(URL0);
            expect(responses401?.at(1)).toContain(URL1);

            expect(responses200?.at(0)).toContain(REFRESH_URL);
            expect(responses200?.at(1)).toContain(URL0);
            expect(responses200?.at(2)).toContain(URL1);
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
            const { responses401, responses200 } = getResponses();
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
            const { responses401, responses200, responses400 } = getResponses();
            // 1. URL0, URL1 give 401 (or 403)
            expect(responses401?.at(0)).toContain(URL0);
            expect(responses401?.at(1)).toContain(URL1);
            // 2. Unsuccessful refresh happens (with 400)
            expect(responses400?.at(0)).toContain(REFRESH_URL);
            // (redirect to login must happen and requests are not re-tried)

            // Test lengths
            expect(responses401.length).toBe(2);
            expect(responses400.length).toBe(1);
            expect(responses200.length).toBe(0);
        });
    });
});
