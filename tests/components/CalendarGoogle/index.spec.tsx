import { test } from "@playwright/experimental-ct-react";
import gotoSafe from "../../_util/gotoSafe";
import { getCellTestId } from "../../../src/components/Calendar/Views/BaseCell";
import { Browser, chromium, Page } from "@playwright/test";

// WARNING: you need to be already authenticated to google for this test to work

const baseUrl = "http://127.0.0.1:3000/__test__/calendar";

/**
 * Returns the start of the week (Monday) for a given date
 * @param {Date} date - The date to get the start of week for (defaults to today)
 * @returns {Date} - The start of the week (Monday at 00:00:00)
 */
function getStartOfWeek(date = new Date()) {
    const d = new Date(date);
    const day = d.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Calculate days to subtract to get to Monday
    // If day is 0 (Sunday), we need to go back 6 days
    // If day is 1 (Monday), we need to go back 0 days
    // If day is 2 (Tuesday), we need to go back 1 day, etc.
    const daysToSubtract = day === 0 ? 6 : day - 1;

    d.setDate(d.getDate() - daysToSubtract);
    d.setHours(0, 0, 0, 0); // Set to start of day

    return d;
}

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

test("Event", async () => {
    const startDate = getStartOfWeek();
    const CELL_TESTID = getCellTestId(startDate);

    console.log("Looking for cell with testid:", CELL_TESTID);
    console.log("Start date:", startDate.toISOString());

    // Check what test IDs actually exist on the page
    const allTestIds = await page.$$eval("[data-testid]", (elements) =>
        elements.map((el) => el.getAttribute("data-testid"))
    );
    console.log("Available test IDs:", allTestIds);

    await page.getByTestId(CELL_TESTID).click();
});
