import { Page, Response, Route, expect } from "@playwright/test";

import {
    HIDDEN_VIEW_TESTID,
    OPEN_VIEW_BUTTON_TESTID,
} from "../../../src/sections/__test__/RefreshToken/constants";
import { URL0, URL1 } from "./constants";

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

const testUrlWithStatus =
    (URL: string, status: number, onResult: (b: boolean) => void) =>
    (resp: Response) => {
        const res = resp.url().includes(URL) && resp.status() === status;
        onResult(res);
        return res;
    };

const expectUrlsToHaveStatus = async (page: Page, status: number) => {
    let p0 = false;
    let p1 = false;

    const setP0 = (b: boolean) => (p0 = b);
    const setP1 = (b: boolean) => (p1 = b);

    await page.waitForResponse(testUrlWithStatus(URL0, status, setP0));
    await page.waitForResponse(testUrlWithStatus(URL1, status, setP1));

    expect(p0 || p1).toBe(true);
};

const expectUrlsToSucceed = (page: Page) => expectUrlsToHaveStatus(page, 200);
const expectUrlsToUnauthorized = (page: Page) =>
    expectUrlsToHaveStatus(page, 401);

// -----------------------------------------------------------------------------------

const setupGetNewTokensToSucceed = async (
    page: Page,
    unroute: boolean = false
) =>
    page.route(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, async (route) => {
        // INFO: Disable interceptors to allow natural flow (a.k.a. to actually succeed with the refreshed tokens)
        if (unroute) {
            await unrouteQueries(page);
        }

        // Call original!
        await route.continue();
    });

const setupGetNewTokensToFail = (page: Page) =>
    page.route(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
        fullfillWithStatus(400)
    );

// -----------------------------------------------------------------------------------

export {
    openHiddenQueriesView,
    // ...
    setupQueriesToFullfillWithStatus,
    // ...
    setupGetNewTokensToSucceed,
    setupGetNewTokensToFail,
};
