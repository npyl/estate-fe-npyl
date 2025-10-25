import { Page, Route } from "@playwright/test";
import {
    HIDDEN_VIEW_TESTID,
    OPEN_VIEW_BUTTON_TESTID,
} from "../../../src/sections/__test__/RefreshToken/constants";
import { BE_API_URL, URL0, URL1 } from "./constants";

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

const responses400: string[] = [];
const responses401: string[] = [];
const responses200: string[] = [];

const monitorResponses = async (page: Page) => {
    page.on("response", (response) => {
        const url = response.url();
        const status = response.status();

        // INFO: ignore non-BE calls
        if (!url.startsWith(BE_API_URL)) return;

        // INFO: catch 401 requests!
        if (status === 401 || status === 403) responses401.push(url);

        // INFO: log all status=200 or 400 requests AFTER the 401 requests (e.g. to catch the refresh, and the actual requests succeeding!)
        if (responses401.length < 2) return;
        if (status === 400) responses400.push(url);
        if (status === 200) responses200.push(url);
    });
};

// -----------------------------------------------------------------------------------

export {
    openHiddenQueriesView,
    // ...
    setupQueriesToFullfillWithStatus,
    // ...
    setupGetNewTokensToSucceed,
    setupGetNewTokensToFail,
    // ...
    monitorResponses,
    responses400,
    responses401,
    responses200,
};
