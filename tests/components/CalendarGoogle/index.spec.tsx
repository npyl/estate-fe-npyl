import { test } from "@playwright/experimental-ct-react";
import gotoSafe from "../../_util/gotoSafe";
import {
    EVENT_CLASSNAME,
    getEventTestId,
} from "../../../src/components/Calendar/Event/constants";
import {
    EVENT_POPOVER_SUBMIT_TESTID,
    EVENT_POPOVER_TITLE_TESTID,
} from "../../../src/sections/Calendar/Event/form/constants";
import { CREATE_EVENT_ID } from "../../../src/constants/calendar";
import fillAndExpect from "../../_util/fillAndExpect";
import uuidv4 from "../../../src/utils/uuidv4";
import getEventByClassName from "./_util/getEventByClassName";
import makeEvent from "./makeEvent";
import testBasicFlow from "./testBasicFlow";
import expectPopoverClosed from "./testBasicFlow/getCallbacks/popover/expectClosed";
import clickOutside from "./_util/clickOutside";
import { Browser, chromium, Page } from "@playwright/test";
import safeReload from "./_util/safeReload";

// INFO: you need to be already authenticated to google for this test to work

const SEARCH_DEEP = true;

const baseUrl = "http://127.0.0.1:3000/__test__/calendar";

// let browser: Browser;
// let page: Page;

// // INFO: for ever test we need to bring up a non-headless browser instance (because the Map cannot load without a view)
// test.beforeAll(async () => {
//     test.setTimeout(5 * 60 * 1000);
//     browser = await chromium.launch({ headless: false });
//     const context = await browser.newContext();
//     page = await context.newPage();
//     await gotoSafe(page, baseUrl);
// });

// test.afterAll(async () => {
//     await browser?.close();
// });

test.beforeEach(async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);
    await gotoSafe(page, baseUrl);
});

// test("Event (Create)", async ({ page }) => {
//     const { cell } = await makeEvent(page);
//     const event = page.getByTestId(getEventTestId(CREATE_EVENT_ID));
//     await testBasicFlow(page, event, CREATE_EVENT_ID, cell);

//     // click outside the event & expect the popover to close
//     await clickOutside(page, event);
//     await expectPopoverClosed(page, CREATE_EVENT_ID);
// });

test("Event (Existing)", async ({ page }) => {
    const { cell } = await makeEvent(page);

    await fillAndExpect(
        page,
        EVENT_POPOVER_TITLE_TESTID,
        uuidv4(),
        SEARCH_DEEP
    );

    // Wait for the createEvent API call and capture the response
    const createEventPromise = page.waitForResponse(
        (response) =>
            response.url().includes("/events/create") &&
            response.request().method() === "POST" &&
            response.status() === 200
    );

    await page.getByTestId(EVENT_POPOVER_SUBMIT_TESTID).click();

    // Wait for the API response and get the eventId
    const response = await createEventPromise;
    const eventId = await response.text();

    await page.waitForLoadState("networkidle", { timeout: 2 * 60 * 1000 });
    await page.waitForLoadState("domcontentloaded", { timeout: 2 * 60 * 1000 });

    const event = page.getByTestId(getEventTestId(eventId));

    await testBasicFlow(page, event, eventId, cell);
});
