import { Page, Route, test } from "@playwright/test";
import gotoSafe from "../../_util/gotoSafe";

import {
    HIDDEN_VIEW_TESTID,
    OPEN_VIEW_BUTTON_TESTID,
    // ...
    URL0,
    URL1,
    URL2,
} from "../../../src/sections/__test__/RefreshToken/constants";

test.beforeEach(async ({ page }) => {
    await gotoSafe(page, "http://127.0.0.1:3000/__test__/refreshToken");
});

const openHiddenQueriesView = async (page: Page) => {
    // click
    await page.getByTestId(OPEN_VIEW_BUTTON_TESTID).click();

    // wait for view to open
    await page.getByTestId(HIDDEN_VIEW_TESTID).waitFor({ state: "visible" });
};

// -----------------------------------------------------------------------------------

let getNewTokensSuccess = false;

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

const setupQueriesToFullfillWithStatus = async (page: Page, status: number) => {
    await page.route(URL0, fullfillWithStatus(status));
    await page.route(URL1, fullfillWithStatus(status));
    await page.route(URL2, fullfillWithStatus(status));
};

// -----------------------------------------------------------------------------------

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

test.describe("RefreshToken Flows", () => {
    test("AccessToken Expires -> Refreshing Tokens (SUCCESS) -> All Requests are re-evaluated", async ({
        page,
    }) => {
        // 0. for step 2. and 3., respectively
        await setupQueriesToFullfillWithStatus(page, 401);
        await setupGetNewTokensToSucceed(page, onSuccessAfterRefresh);

        // 1. click toggle (hidden view with useQuery0(), useQuery1(), ..., appear)
        await openHiddenQueriesView(page);

        // 2. the fetches of these queries return 401 (or 403) (a.k.a. Unauthorized)
        // 3. token revalidation is attempted (SUCCESS or FAIL support)

        await Promise.all([
            page.waitForResponse((resp) => resp.url().includes(URL0)),
            page.waitForResponse((resp) => resp.url().includes(URL1)),
            page.waitForResponse((resp) => resp.url().includes(URL2)),
        ]);
    });

    test("AccessToken Expires -> Refreshing Tokens (FAIL) -> All Requests finally fail", async ({
        page,
    }) => {
        // 0. for step 2. and 3., respectively
        await setupQueriesToFullfillWithStatus(page, 401);
        await setupGetNewTokensToFail(page);

        // 1. click toggle (hidden view with useQuery0(), useQuery1(), ..., appear)
        await openHiddenQueriesView(page);

        // 2. the fetches of these queries return 401 (or 403) (a.k.a. Unauthorized)
        // 3. token revalidation is attempted (SUCCESS or FAIL support)

        await Promise.all([
            page.waitForResponse((resp) => resp.url().includes(URL0)),
            page.waitForResponse((resp) => resp.url().includes(URL1)),
            page.waitForResponse((resp) => resp.url().includes(URL2)),
        ]);
    });
});
