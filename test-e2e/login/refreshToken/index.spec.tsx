import { Page, test, Browser, chromium, expect } from "@playwright/test";
import gotoSafe from "../../_util/gotoSafe";
import login from "../_shared/login";
import { PAGE_URL, SHOULD_FULLFILL_NATURALLY, URL0, URL1 } from "./constants";
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

const BE_API_URL = "https://property-pro.gr/api/v0.1";

const responses401: string[] = [];
const responses200: string[] = [];

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

    page.on("response", async (response) => {
        const url = response.url();
        const status = response.status();

        // INFO: ignore non-BE calls
        if (!url.startsWith(BE_API_URL)) return;

        // INFO: catch 401 requests!
        if (status === 401 || status === 403) responses401.push(url);

        // INFO: log all status=200 requests AFTER the 401 requests (e.g. to catch the refresh, and the actual requests succeeding!)
        if (responses401.length < 2) return;
        if (status === 200) responses200.push(url);
    });

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

        // await expectFirstName(page);
        // await expectTotal(page);

        await page.waitForTimeout(30 * 1000);

        expect(responses401?.at(0)).toContain(URL0);
        expect(responses401?.at(1)).toContain(URL1);

        console.log("responses200: ", responses200);

        expect(responses200?.at(0)).toContain(`${BE_API_URL}/refresh`);
        expect(responses200?.at(1)).toContain(URL0);
        expect(responses200?.at(2)).toContain(URL1);

        await page.waitForTimeout(5 * 60 * 1000);
    });
});
