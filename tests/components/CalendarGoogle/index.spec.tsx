import { test } from "@playwright/experimental-ct-react";
import gotoSafe from "../../_util/gotoSafe";
import { getCellTestId } from "../../../src/components/Calendar/Views/BaseCell";
import { START_OF_WEEK_ID } from "../../../src/sections/__test__/CalendarGoogle/constants";
import { getEventTestId } from "../../../src/components/Calendar/Event/constants";
import {
    EVENT_POPOVER_SUBMIT_TESTID,
    EVENT_POPOVER_TITLE_TESTID,
} from "../../../src/sections/Calendar/Event/form/constants";
import {
    CELL_HOUR_HEIGHT,
    CREATE_EVENT_ID,
} from "../../../src/constants/calendar";
import GoogleOAuthBeforeAllHook from "../../_hooks/GoogleOAuth";
import expectHeight from "./_util/expectHeight";
import resizeY from "./resizeY";
import { dragToNextCell, expectOnNextCell } from "./dragToNextCell";
import { Browser, chromium, Locator, Page } from "@playwright/test";
import fillAndExpect from "../../_util/fillAndExpect";
import uuidv4 from "../../../src/utils/uuidv4";
import removeAllEvents from "./_util/removeAllEvents";

const SEARCH_DEEP = true;

const baseUrl = "http://127.0.0.1:3000/__test__/calendar";

let browser: Browser;
let page: Page;

test.beforeAll(async () => {
    // INFO: you need to be already authenticated to google for this test to work
    await GoogleOAuthBeforeAllHook();

    test.setTimeout(5 * 60 * 1000);
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await gotoSafe(page, baseUrl);
});

// test.beforeEach(async ({ page }) => {
//     test.setTimeout(2 * 60 * 1000);
//     await gotoSafe(page, baseUrl);
// });

/**
 * Clicks on the first weekday's cell and an event with its popover pops up
 * @param page
 */
const makeEvent = async (page: Page) => {
    // 1. week start as start date
    const startDate = await page.getByTestId(START_OF_WEEK_ID).innerText();

    // 2. click on week start cell
    const CELL_TESTID = getCellTestId(startDate);
    await page.getByTestId(CELL_TESTID).click();

    // 3. remove all events of cell clicking
    await removeAllEvents(startDate);

    // 4. make sure ui is also on track with this change
    await page.reload();

    // 5. wait for "create-event" to appear
    const event = page.getByTestId(getEventTestId(CREATE_EVENT_ID));
    await event.waitFor({ state: "visible" });

    // 6. expect "create-event" height to be 60px
    await expectHeight(event, CELL_HOUR_HEIGHT);

    return { startDate, CELL_TESTID };
};

/**
 * Tests resize & drag to cell neighbouring cell on the right of an event ("create" or existing)
 * @param event
 * @param CELL_TESTID
 * @param isCreate
 */
const testBasicFlow = async (
    event: Locator,
    CELL_TESTID: string,
    isCreate: boolean
) => {
    //
    //  Resize
    //
    await resizeY(page, event, CELL_HOUR_HEIGHT, CREATE_EVENT_ID, isCreate);

    // Wait for the element to reach the expected size
    await expectHeight(event, 2 * CELL_HOUR_HEIGHT);

    //
    //  Drag
    //
    const dragStats = await dragToNextCell(page, event, CELL_TESTID);

    // 4. Wait for any drag animations/transitions to complete
    await page.waitForTimeout(1000);

    await expectOnNextCell(event, dragStats);
};

// test("Event (Create)", async () => {
//     const { event, CELL_TESTID } = await makeEvent(page);
//     await testBasicFlow(event, CELL_TESTID, true);
// });

test("Event (Existing)", async () => {
    const { CELL_TESTID } = await makeEvent(page);

    await fillAndExpect(
        page,
        EVENT_POPOVER_TITLE_TESTID,
        uuidv4(),
        SEARCH_DEEP
    );

    await page.getByTestId(EVENT_POPOVER_SUBMIT_TESTID).click();

    await page.waitForTimeout(10 * 1000);

    // const event = page.getByTestId();
    // await testBasicFlow(event, CELL_TESTID, false);
});
