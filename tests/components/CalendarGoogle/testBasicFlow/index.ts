import { CELL_HOUR_HEIGHT } from "../../../../src/constants/calendar";
import expectHeight from "../_util/expectHeight";
import resizeY from "./resizeY";
import { dragToNextCell, expectOnNextCell } from "./dragToNextCell";
import { Locator, Page } from "@playwright/test";

/**
 * Tests resize & drag to cell neighbouring cell on the right of an event ("create" or existing)
 * @param event
 * @param CELL_TESTID
 * @param isCreate
 */
const testBasicFlow = async (
    page: Page,
    event: Locator,
    eventId: string,
    cell: Locator,
    isCreate: boolean
) => {
    //
    //  Resize
    //
    await resizeY(page, event, eventId, CELL_HOUR_HEIGHT, isCreate);

    // Wait for the element to reach the expected size
    await expectHeight(event, 2 * CELL_HOUR_HEIGHT);

    //
    //  Drag
    //
    const dragStats = await dragToNextCell(
        page,
        event,
        eventId,
        cell,
        isCreate
    );

    // 4. Wait for any drag animations/transitions to complete
    await page.waitForTimeout(1000);

    await expectOnNextCell(event, dragStats);
};

export default testBasicFlow;
