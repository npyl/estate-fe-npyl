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

interface Position {
    x: number;
    y: number;
}

const drag = async (initial: Position, final: Position) => {
    await page.mouse.move(initial.x, initial.y);
    await page.mouse.down();
    await page.mouse.move(final.x, final.y);
    await page.mouse.up();
};

const resizeY = async (ev: Locator, offsetY: number) => {
    // 1. Get the current bounding box to calculate the bottom position
    const initialBoundingBox = await ev.boundingBox();
    expect(initialBoundingBox).toBeTruthy();

    // 2. Calculate the bottom edge position for mouse down
    const bottomX = initialBoundingBox!.x + initialBoundingBox!.width / 2; // center horizontally
    const bottomY = initialBoundingBox!.y + initialBoundingBox!.height - 2; // 2px from bottom edge

    await drag(
        { x: bottomX, y: bottomY },
        { x: bottomX, y: bottomY + offsetY }
    );
};

const getDragOffset = async (cellId: string) => {
    // 1. get cell width
    const cellElement = page.getByTestId(cellId);
    const cellBoundingBox = await cellElement.boundingBox();
    expect(cellBoundingBox).toBeTruthy();
    const cellWidth = cellBoundingBox!.width;

    // 2. drag event right for cell width + 1/2 cell width

    const offsetX = cellWidth + cellWidth / 2; // cell width + 1/2 cell width

    return offsetX;
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
    await resizeY(event, CELL_HOUR_HEIGHT);

    // Wait for the element to reach the expected size
    await expectHeight(event, 2 * CELL_HOUR_HEIGHT);

    //
    //  Drag
    //

    // 1. get event center
    const eventBoundingBox = await event.boundingBox();
    expect(eventBoundingBox).toBeTruthy();
    const centerX = eventBoundingBox!.x + eventBoundingBox!.width / 2;
    const centerY = eventBoundingBox!.y + eventBoundingBox!.height / 2;

    // 2. calculate dragOffset based on cell width
    const dragOffset = await getDragOffset(CELL_TESTID);

    // 3. perform horizontal drag (just enough to trigger a snap to neighbouring cell on the right)
    await drag(
        { x: centerX, y: centerY },
        { x: centerX + dragOffset, y: centerY }
    );

    // 4. check if positioned correct!
});
