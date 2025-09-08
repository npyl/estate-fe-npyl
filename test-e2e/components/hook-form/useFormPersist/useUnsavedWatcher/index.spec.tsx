import { test, expect } from "@playwright/experimental-ct-react";
import gotoSafe from "../../../../_util/gotoSafe";
import {
    INCREMENT_CALLBACK_KEY,
    NAVIGATE_TESTID,
    SAME_PATH_REDIRECT_TESTID,
} from "../../../../../src/sections/__test__/useUnsavedWatcher/constants";
import { Page } from "@playwright/test";

const baseUrl = "http://127.0.0.1:3000/__test__/useUnsavedWatcher";

// -------------------------------------------------------------------------------------------

const DELAY = 2 * 60 * 1000;

const setupCallTracking = async (page: Page) => {
    let callCount = 0;

    const increment = () => callCount++;
    const getCount = () => callCount;

    await page.exposeFunction(INCREMENT_CALLBACK_KEY, increment);

    return { getCount };
};

// -------------------------------------------------------------------------------------------

const samePathRedirect = async (page: Page) => {
    await page.getByTestId(SAME_PATH_REDIRECT_TESTID).click();
    await page.waitForLoadState("load", { timeout: DELAY });
};

const clickNavigate = async (page: Page) => {
    await page.getByTestId(NAVIGATE_TESTID).click();
    await page.waitForURL("http://127.0.0.1:3000/", { timeout: DELAY });
    await page.waitForLoadState("load", { timeout: DELAY });
};

// -------------------------------------------------------------------------------------------

test.describe("useUnsavedWatcher", () => {
    test.beforeEach(async ({ page }) => {
        await gotoSafe(page, baseUrl);
    });

    test("beforeunload (refresh)", async ({ page }) => {
        const tracker = await setupCallTracking(page);
        await page.reload({ waitUntil: "load", timeout: DELAY });
        expect(tracker.getCount()).toBe(1);
    });

    test("onRouteChange (same path)", async ({ page }) => {
        const tracker = await setupCallTracking(page);
        await samePathRedirect(page);
        expect(tracker.getCount()).toBe(0);
    });

    test("onRouteChange (different path)", async ({ page }) => {
        const tracker = await setupCallTracking(page);
        await gotoSafe(page, "about:blank");
        expect(tracker.getCount()).toBe(1);
    });

    test("onRouteChange (different path, programmatically)", async ({
        page,
    }) => {
        const tracker = await setupCallTracking(page);
        await clickNavigate(page);
        expect(tracker.getCount()).toBe(1);
    });
});
