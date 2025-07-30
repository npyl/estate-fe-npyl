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
import { MAP_SEARCH_TESTID } from "../../../src/components/Map/plugins/Search";

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

    // Read result & Assert
    const value = await page
        .getByTestId(CLICK_RES_ID)
        .innerText({ timeout: 2 * 60 * 1000 });
    expect(value).toBe(CLICK_VALUE_STR);
});

// --------------------------------------------------------------------------------------------

const SEARCH_LITERAL = "ATHENS";
const ATHENS_PLACE_ID = "ChIJ8UNwBh-9oRQR3Y1mdkU1Nic"; // google assigns a place_id to every possible option
const SEARCH_VALUE = {
    lat: 37.9838096,
    lng: 23.7275388,
    address: { street: "", number: "", zipCode: "" },
};
const SEARCH_VALUE_STR = JSON.stringify(SEARCH_VALUE);

test("Search", async () => {
    test.setTimeout(5 * 60 * 1000);

    // Focus on search & input our search literal
    const searchInput = page.getByTestId(MAP_SEARCH_TESTID);
    await searchInput.focus();
    await searchInput.fill(SEARCH_LITERAL);

    // TODO: check if options-popover remains open while typing!!!

    // Click option when available
    await page
        .getByTestId(ATHENS_PLACE_ID)
        .isVisible({ timeout: 2 * 60 * 1000 });
    await page.getByTestId(ATHENS_PLACE_ID).click();

    // Read result & Assert
    const value = await page
        .getByTestId(CLICK_RES_ID)
        .innerText({ timeout: 2 * 60 * 1000 });
    expect(value).toBe(SEARCH_VALUE_STR);
});
