import { Page, test, Browser, chromium } from "@playwright/test";
import gotoSafe from "../../_util/gotoSafe";
import login from "../_shared/login";
import { PAGE_URL, SHOULD_FULLFILL_NATURALLY } from "./constants";
import {
    // ...
    FIRSTNAME_TESTID,
    TOTAL_TESTID,
} from "../../../src/sections/__test__/RefreshToken/constants";
import {
    openHiddenQueriesView,
    setupGetNewTokensToSucceed,
    setupQueriesToFullfillWithStatus,
} from "./util";

// ---------------------------------------------------------------------------------------------------------

let browser: Browser;
let page: Page;

// INFO: for every test we need to bring up a non-headless browser instance (because the Map cannot load without a view)
test.beforeAll(async () => {
    test.setTimeout(5 * 60 * 1000);

    browser = await chromium.launch({
        headless: false,
        devtools: true,
    });
    const context = await browser.newContext();
    page = await context.newPage();

    await gotoSafe(page, "http://127.0.0.1:3000");
});

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
    test("AccessToken Expires -> Refreshing Tokens (SUCCESS) -> All Requests are re-evaluated", async () => {
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
    });
});
