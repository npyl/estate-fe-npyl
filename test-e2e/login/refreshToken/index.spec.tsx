import { Page, test, expect } from "@playwright/test";
import gotoSafe from "../../_util/gotoSafe";
import login from "../_shared/login";
import {
    PAGE_URL,
    REFRESH_URL,
    SHOULD_FULLFILL_NATURALLY,
    URL0,
    URL1,
} from "./constants";
import {
    // ...
    FIRSTNAME_TESTID,
    TOTAL_TESTID,
} from "../../../src/sections/__test__/RefreshToken/constants";
import {
    monitorResponses,
    openHiddenQueriesView,
    responses200,
    responses401,
    setupGetNewTokensToSucceed,
    setupQueriesToFullfillWithStatus,
} from "./util";

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

test.describe("RefreshToken Flows", () => {
    test.beforeEach(async ({ page }) => {
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

        expect(responses401?.at(0)).toContain(URL0);
        expect(responses401?.at(1)).toContain(URL1);

        expect(responses200?.at(0)).toContain(REFRESH_URL);
        expect(responses200?.at(1)).toContain(URL0);
        expect(responses200?.at(2)).toContain(URL1);
    });
});
