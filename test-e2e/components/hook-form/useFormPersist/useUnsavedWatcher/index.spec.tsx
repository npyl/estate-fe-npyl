import { test, expect } from "@playwright/experimental-ct-react";
import gotoSafe from "../../../../_util/gotoSafe";
import {
    NAVIGATE_TESTID,
    SAME_PATH_REDIRECT_TESTID,
} from "../../../../../src/sections/__test__/useUnsavedWatcher/constants";
import { Page } from "@playwright/test";

const baseUrl = "http://127.0.0.1:3000/__test__/useUnsavedWatcher";

// -------------------------------------------------------------------------------------------

const DELAY = 2 * 60 * 1000;

class CallTracker {
    private callCount = 0;

    increment() {
        this.callCount++;
    }

    getCount() {
        return this.callCount;
    }

    reset() {
        this.callCount = 0;
    }
}

const setupCallTracking = async (page: Page) => {
    const tracker = new CallTracker();

    // Expose functions to the page context
    await page.exposeFunction("incrementTestCallCount", () =>
        tracker.increment()
    );
    await page.exposeFunction("getTestCallCount", () => tracker.getCount());
    await page.exposeFunction("resetTestCallCount", () => tracker.reset());

    // Initialize the tracking in the page
    await page.evaluate(() => {
        (window as any).callCount = 0;
        (window as any).trackCall = () => {
            (window as any).callCount = ((window as any).callCount || 0) + 1;
            (window as any).incrementTestCallCount();
        };
    });

    return tracker;
};

const samePathRedirect = async (page: Page) => {
    await page.getByTestId(SAME_PATH_REDIRECT_TESTID).click();
    await page.waitForLoadState("networkidle", { timeout: DELAY });
};

const clickNavigate = async (page: Page) => {
    await page.getByTestId(NAVIGATE_TESTID).click();
    await page.waitForLoadState("networkidle", { timeout: DELAY });
};

// -------------------------------------------------------------------------------------------

test.describe("useUnsavedWatcher", () => {
    let tracker: CallTracker;

    test.beforeEach(async ({ page }) => {
        await gotoSafe(page, baseUrl);
        tracker = await setupCallTracking(page);
    });

    test("beforeunload (refresh)", async ({ page }) => {
        await page.reload();
        await page.waitForTimeout(100);
        expect(tracker.getCount()).toBe(1);
    });

    test("onRouteChange (same path)", async ({ page }) => {
        await samePathRedirect(page);
        expect(tracker.getCount()).toBe(0);
    });

    test("onRouteChange (different path)", async ({ page }) => {
        await gotoSafe(page, "about:blank");
        expect(tracker.getCount()).toBe(1);
    });

    test("onRouteChange (different path, programmatically)", async ({
        page,
    }) => {
        await clickNavigate(page);
        expect(tracker.getCount()).toBe(1);
    });
});
