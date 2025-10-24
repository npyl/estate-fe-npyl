import {
    Page,
    test,
    Response,
    Browser,
    chromium,
    Route,
    expect,
} from "@playwright/test";
import gotoSafe from "../../_util/gotoSafe";

import {
    HIDDEN_VIEW_TESTID,
    OPEN_VIEW_BUTTON_TESTID,
    // ...
    FIRSTNAME_TESTID,
    TOTAL_TESTID,
} from "../../../src/sections/__test__/RefreshToken/constants";
import login from "../_shared/login";

// -------------------------------------------------------------------------------------------------------

const PAGE_URL = "http://127.0.0.1:3000/__test__/refreshToken";

// -------------------------------------------------------------------------------------------------------

const URL0 = `${process.env.NEXT_PUBLIC_API_URL}/users`;
const URL1 = `${process.env.NEXT_PUBLIC_API_URL}/dashboard`;

// -------------------------------------------------------------------------------------------------------

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

const fullfillWithStatus = (status: number) => async (route: Route) =>
    route.fulfill({
        status,
        contentType: "application/json",
        body: JSON.stringify({}),
    });

const interceptUrlWithStatusAndUnroute = (
    page: Page,
    url: string,
    status: number
) => page.route(url, fullfillWithStatus(status));

// -------------------------------------------------------------------------------------------------------

const setupQueriesToFullfillWithStatus = async (page: Page, status: number) => {
    await interceptUrlWithStatusAndUnroute(page, URL0, status);
    await interceptUrlWithStatusAndUnroute(page, URL1, status);
};

const unrouteQueries = async (page: Page) => {
    await page.unroute(URL0);
    await page.unroute(URL1);
};

// -------------------------------------------------------------------------------------------------------

const openHiddenQueriesView = async (page: Page) => {
    // click
    await page.getByTestId(OPEN_VIEW_BUTTON_TESTID).click();

    // wait for view to open
    await page.getByTestId(HIDDEN_VIEW_TESTID).waitFor({ state: "visible" });
};

// -----------------------------------------------------------------------------------

const expectUrlsToHaveStatus = (page: Page, status: number) =>
    Promise.all([
        page.waitForResponse(testUrlWithStatus(URL0, status)),
        // page.waitForResponse(testUrlWithStatus(URL1, status)),
    ]);

// -----------------------------------------------------------------------------------

const expectUrlsToSucceed = (page: Page) => expectUrlsToHaveStatus(page, 200);
const expectUrlsToUnauthorized = (page: Page) =>
    expectUrlsToHaveStatus(page, 401);
const expectUrlsToFail = (page: Page) => expectUrlsToHaveStatus(page, 400);

// -----------------------------------------------------------------------------------

const setupGetNewTokensToSucceed = async (page: Page) =>
    page.route(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, async (route) => {
        // Disable interceptors!
        await unrouteQueries(page);

        // Call original!
        await route.continue();
    });

const setupGetNewTokensToFail = (page: Page) =>
    page.route(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
        fullfillWithStatus(400)
    );

// -----------------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------------

const testUrlWithStatus = (URL: string, status: number) => (resp: Response) =>
    resp.url().includes(URL) && resp.status() === status;

test.describe("RefreshToken Flows", () => {
    test("AccessToken Expires -> Refreshing Tokens (SUCCESS) -> All Requests are re-evaluated", async () => {
        test.setTimeout(5 * 60 * 1000);

        await setupQueriesToFullfillWithStatus(page, 401);
        await setupGetNewTokensToSucceed(page);

        // Force a brand-new session for token validity
        await login(page);

        // Navigate to PAGE_URL & wait for all network operations to finish
        await gotoSafe(page, PAGE_URL);
        await page.waitForLoadState("networkidle", { timeout: 2 * 60 * 1000 });

        // Now click toggle to trigger the queries
        await openHiddenQueriesView(page);

        // await expectUrlsToSucceed(page);

        // INFO: when the two queries re-run expect some content to appear
        await expectFirstName(page);
        // await expectTotal(page);

        await page.waitForTimeout(5 * 60 * 1000);
    });

    test("AccessToken Expires -> Refreshing Tokens (FAILURE) -> Logout", async () => {
        test.setTimeout(5 * 60 * 1000);

        await setupQueriesToFullfillWithStatus(page, 401);
        await setupGetNewTokensToFail(page);

        // Force a brand-new session for token validity
        await login(page);

        // Navigate to PAGE_URL & wait for all network operations to finish
        await gotoSafe(page, PAGE_URL);
        await page.waitForLoadState("networkidle", { timeout: 2 * 60 * 1000 });

        // Now click toggle to trigger the queries
        await openHiddenQueriesView(page);

        await page.waitForURL("**/login");
    });
});
