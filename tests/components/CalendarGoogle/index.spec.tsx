import { expect, test } from "@playwright/experimental-ct-react";
import gotoSafe from "../../_util/gotoSafe";
import { getCellTestId } from "../../../src/components/Calendar/Views/BaseCell";
import { START_OF_WEEK_ID } from "../../../src/sections/__test__/CalendarGoogle/constants";
import { getEventTestId } from "../../../src/components/Calendar/Event/constants";
import {
    CELL_HOUR_HEIGHT,
    CREATE_EVENT_ID,
} from "../../../src/constants/calendar";
import { Locator, Page } from "@playwright/test";
import GoogleOAuthBeforeAllHook from "../../_hooks/GoogleOAuth";

const baseUrl = "http://127.0.0.1:3000/__test__/calendar";

test.beforeAll(async () => {
    // INFO: you need to be already authenticated to google for this test to work
    await GoogleOAuthBeforeAllHook();
});

test.beforeEach(async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);
    await gotoSafe(page, baseUrl);
});

/**
 * Expect an element to have a specific height (number) in pixels
 * @param el an element
 * @param height expected height (px) for this element
 */
const expectHeight = async (el: Locator, height: number) => {
    const EXPECTED_HEIGHT = `${height}px`;
    await expect(el).toHaveCSS("height", EXPECTED_HEIGHT);
};

interface Position {
    x: number;
    y: number;
}

const drag = async (page: Page, initial: Position, final: Position) => {
    await page.mouse.move(initial.x, initial.y);
    await page.mouse.down();
    await page.mouse.move(final.x, final.y);
    await page.mouse.up();
};

const resizeY = async (page: Page, ev: Locator, offsetY: number) => {
    // 1. Get the current bounding box to calculate the bottom position
    const initialBoundingBox = await ev.boundingBox();
    expect(initialBoundingBox).toBeTruthy();

    // 2. Calculate the bottom edge position for mouse down
    const bottomX = initialBoundingBox!.x + initialBoundingBox!.width / 2; // center horizontally
    const bottomY = initialBoundingBox!.y + initialBoundingBox!.height - 2; // 2px from bottom edge

    await drag(
        page,
        { x: bottomX, y: bottomY },
        { x: bottomX, y: bottomY + offsetY }
    );
};

/**
 * Get a cell's width
 * @param cellId a cell's id (all of them should have the same width though!)
 */
const getCellWidth = async (page: Page, cellId: string) => {
    const cellElement = page.getByTestId(cellId);
    const cellBoundingBox = await cellElement.boundingBox();
    expect(cellBoundingBox).toBeTruthy();
    return cellBoundingBox!.width;
};

test("Event", async ({ page }) => {
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
    await resizeY(page, event, CELL_HOUR_HEIGHT);

    // Wait for the element to reach the expected size
    await expectHeight(event, 2 * CELL_HOUR_HEIGHT);

    //
    //  Drag
    //
    // 1. Store initial position before drag
    const initialBoundingBox = await event.boundingBox();
    expect(initialBoundingBox).toBeTruthy();
    const initialX = initialBoundingBox!.x;
    const initialY = initialBoundingBox!.y;
    const centerX = initialX + initialBoundingBox!.width / 2;
    const centerY = initialY + initialBoundingBox!.height / 2;

    // 2. calculate dragOffset and cellWidth
    const cellWidth = await getCellWidth(page, CELL_TESTID);

    // 3. perform horizontal drag (just enough to trigger a snap to neighbouring cell on the right)
    await drag(
        page,
        { x: centerX, y: centerY },
        { x: centerX + cellWidth, y: centerY }
    );

    // 4. Wait for any drag animations/transitions to complete
    await page.waitForTimeout(1000);

    // 5. Verify final position
    const finalBoundingBox = await event.boundingBox();
    expect(finalBoundingBox).toBeTruthy();
    const finalX = finalBoundingBox!.x;
    const finalY = finalBoundingBox!.y;

    // 6. X position should move by exactly one cell width to the right
    expect(finalX).toBe(initialX + cellWidth);

    // 7. Y position should remain the same
    expect(finalY).toBe(initialY);
});
