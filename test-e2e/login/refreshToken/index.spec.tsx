import { Page, Route, test, expect, Browser, chromium } from "@playwright/test";
import gotoSafe from "../../_util/gotoSafe";

import {
    HIDDEN_VIEW_TESTID,
    OPEN_VIEW_BUTTON_TESTID,
    // ...
    URL0,
    URL1,
    URL2,
} from "../../../src/sections/__test__/RefreshToken/constants";

const PAGE_URL = "http://127.0.0.1:3000/__test__/refreshToken";

const openHiddenQueriesView = async (page: Page) => {
    // click
    await page.getByTestId(OPEN_VIEW_BUTTON_TESTID).click();

    // wait for view to open
    await page.getByTestId(HIDDEN_VIEW_TESTID).waitFor({ state: "visible" });
};

// -----------------------------------------------------------------------------------

let getNewTokensSuccess = false;

const FAKE_BASE_URL = "http://127.0.0.1:3000/api/__test__/refreshToken";

const setupQueriesToFullfillWithStatus = async (page: Page, status: number) => {
    const res = await page.request.post(`${FAKE_BASE_URL}?status=${status}`);

    if (res.status() !== 200) throw new Error(await res.text());
};

// -----------------------------------------------------------------------------------

const fullfillWithStatus =
    (status: number, onFullfilled?: VoidFunction) => async (route: Route) => {
        const res = await route.fulfill({
            status: getNewTokensSuccess ? 200 : status,
            contentType: "application/json",
            body: JSON.stringify({}),
        });

        onFullfilled?.();

        return res;
    };

const setupGetNewTokensToSucceed = async (
    page: Page,
    onFullfilled: VoidFunction
) =>
    await page.route(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
        fullfillWithStatus(200, onFullfilled)
    );

const setupGetNewTokensToFail = (page: Page) =>
    page.route(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
        fullfillWithStatus(400)
    );

// -----------------------------------------------------------------------------------

const onSuccessAfterRefresh = () => {
    getNewTokensSuccess = true;
};

let browser: Browser;
let page: Page;

test.beforeAll(async () => {
    test.setTimeout(5 * 60 * 1000);
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

test.afterAll(async () => {
    await browser?.close();
});

test.describe("RefreshToken Flows", () => {
    test("AccessToken Expires -> Refreshing Tokens (SUCCESS) -> All Requests are re-evaluated", async ({}) => {
        // Reset state
        getNewTokensSuccess = false;

        // 0. Setup route handlers BEFORE navigating to the page
        await setupQueriesToFullfillWithStatus(page, 401);
        await setupGetNewTokensToSucceed(page, onSuccessAfterRefresh);

        // Navigate to page AFTER setting up routes
        await gotoSafe(page, PAGE_URL);

        // 1. click toggle (hidden view with useQuery0(), useQuery1(), ..., appear)
        await openHiddenQueriesView(page);

        // 2. the fetches of these queries return 401 (or 403) (a.k.a. Unauthorized)
        // 3. token revalidation is attempted (SUCCESS or FAIL support)

        await Promise.all([
            page.waitForResponse((resp) => resp.url().includes(URL0)),
            page.waitForResponse((resp) => resp.url().includes(URL1)),
            page.waitForResponse((resp) => resp.url().includes(URL2)),
        ]);

        await page.waitForTimeout(5 * 1000 * 60);

        // 4. verify URL remains the same (successful refresh keeps user on page)
        await page.waitForURL(PAGE_URL);
    });

    test("AccessToken Expires -> Refreshing Tokens (FAIL) -> All Requests finally fail", async ({}) => {
        // Reset state
        getNewTokensSuccess = false;

        // 0. Setup route handlers BEFORE navigating to the page
        await setupQueriesToFullfillWithStatus(page, 401);
        await setupGetNewTokensToFail(page);

        // Navigate to page AFTER setting up routes
        await gotoSafe(page, PAGE_URL);

        // 1. click toggle (hidden view with useQuery0(), useQuery1(), ..., appear)
        await openHiddenQueriesView(page);

        // 2. the fetches of these queries return 401 (or 403) (a.k.a. Unauthorized)
        // 3. token revalidation is attempted (SUCCESS or FAIL support)

        await Promise.all([
            page.waitForResponse((resp) => resp.url().includes(URL0)),
            page.waitForResponse((resp) => resp.url().includes(URL1)),
            page.waitForResponse((resp) => resp.url().includes(URL2)),
        ]);

        await page.waitForTimeout(5 * 1000 * 60);

        // 4. verify redirect to login screen
        await page.waitForURL("http://127.0.0.1:3000/login");
    });
});
