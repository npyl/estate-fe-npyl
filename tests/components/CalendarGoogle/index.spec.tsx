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

import { Browser, chromium, Page } from "@playwright/test";

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
    const boundingBox = await event.boundingBox();
    expect(boundingBox?.height).toBe(CELL_HOUR_HEIGHT);

    //
    //  Drag
    //

    //
    //  Resize
    //
});
