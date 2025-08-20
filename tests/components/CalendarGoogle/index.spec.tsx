import { expect, test } from "@playwright/experimental-ct-react";
import gotoSafe from "../../_util/gotoSafe";
import { getCellTestId } from "../../../src/components/Calendar/Views/BaseCell";
import { START_OF_WEEK_ID } from "../../../src/sections/__test__/CalendarGoogle/constants";
import { getEventTestId } from "../../../src/components/Calendar/Event/constants";
import {
    CELL_HOUR_HEIGHT,
    CREATE_EVENT_ID,
} from "../../../src/constants/calendar";

// WARNING: you need to be already authenticated to google for this test to work

const baseUrl = "http://127.0.0.1:3000/__test__/calendar";

// test.beforeEach(async ({ page }) => {
//     test.setTimeout(2 * 60 * 1000);
//     await gotoSafe(page, baseUrl);
// });

import { Browser, chromium, Locator, Page } from "@playwright/test";

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

const expectHeight = async (ev: Locator, height: number) => {
    const EXPECTED_HEIGHT = `${height}px`;
    await expect(ev).toHaveCSS("height", EXPECTED_HEIGHT);
};

// test("Event", async ({ page }) => {
test("Event", async () => {
    // 1. week start as start date
    const startDate = await page.getByTestId(START_OF_WEEK_ID).innerText();

    // 2. click on week start cell
    const CELL_TESTID = getCellTestId(startDate);
    await page.getByTestId(CELL_TESTID).click();

    // 3. wait for "create-event" to appear
    const event = page.getByTestId(getEventTestId(CREATE_EVENT_ID));
    await event.waitFor({ state: "visible" });

    // 4. expect "create-event" height to be 60px
    await expectHeight(event, CELL_HOUR_HEIGHT);

    //
    //  Resize
    //
    // 1. Get the current bounding box to calculate the bottom position
    const initialBoundingBox = await event.boundingBox();
    expect(initialBoundingBox).toBeTruthy();

    // 2. Calculate the bottom edge position for mouse down
    const bottomX = initialBoundingBox!.x + initialBoundingBox!.width / 2; // center horizontally
    const bottomY = initialBoundingBox!.y + initialBoundingBox!.height - 2; // 2px from bottom edge

    // 3. Perform the resize drag operation
    await page.mouse.move(bottomX, bottomY);
    await page.mouse.down();
    await page.mouse.move(bottomX, bottomY + CELL_HOUR_HEIGHT); // drag 60px down
    await page.mouse.up();

    // 4. Wait for the element to reach the expected size
    await expectHeight(event, 2 * CELL_HOUR_HEIGHT);

    //
    //  Drag
    //
});
