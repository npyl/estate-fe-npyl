import { expect, test, chromium, Page, Browser } from "@playwright/test"; // Regular Playwright, not component testing
import {
    MARKERS,
    getMarkerTestId,
    TMarker,
    CLICK_RES_ID,
    IClickRes,
    MAP_ID,
} from "../../../src/pages/__test__/map.page";
import gotoSafe from "../../_util/gotoSafe";

const baseUrl = "http://127.0.0.1:3000/__test__/map";

let browser: Browser;
let page: Page;

// INFO: for ever test we need to bring up a non-headless browser instance (because the Map cannot load without a view)
test.beforeAll(async () => {
    test.setTimeout(5 * 60 * 1000);
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await gotoSafe(page, baseUrl);
});

test.afterAll(async () => {
    await browser?.close();
});

// --------------------------------------------------------------------------------------------

const waitForMarker =
    (page: Page) =>
    async ({ propertyId }: TMarker) => {
        const TEST_ID = getMarkerTestId(propertyId);
        const locator = page.getByTestId(TEST_ID);

        // Wait for element to be attached to DOM
        await locator.waitFor({ state: "attached", timeout: 2 * 60 * 1000 });

        // Check if element exists (since visibility doesn't work for map markers)

        const count = await locator.count();

        return count > 0;
    };

test("Markers", async () => {
    const results = await Promise.all(MARKERS.map(waitForMarker(page)));
    expect(results).toEqual([true, true, true, true]);
});

// --------------------------------------------------------------------------------------------

const CLICK_VALUE: IClickRes = {
    lat: 38.246751666595195,
    lng: 21.73335545501711,
    address: { street: "Riga Fereou", number: "108", zipCode: "26221" },
};

const CLICK_VALUE_STR = JSON.stringify(CLICK_VALUE);

test("onClick & GeoLocation", async () => {
    test.setTimeout(5 * 60 * 1000);

    // Perform click on known lat, lng
    await page.getByTestId(MAP_ID).click({ position: { x: 342, y: 291 } });

    // Wait for geolocation calculation result to appear
    await page.getByTestId(CLICK_RES_ID).isVisible({ timeout: 2 * 60 * 1000 });

    // Read result
    const value = await page
        .getByTestId(CLICK_RES_ID)
        .innerText({ timeout: 2 * 60 * 1000 });

    // Assert
    expect(value).toBe(CLICK_VALUE_STR);
});
