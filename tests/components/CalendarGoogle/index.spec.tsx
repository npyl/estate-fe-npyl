import { test } from "@playwright/experimental-ct-react";
import gotoSafe from "../../_util/gotoSafe";
import { getCellTestId } from "../../../src/components/Calendar/Views/BaseCell";
import { START_OF_WEEK_ID } from "../../../src/sections/__test__/CalendarGoogle/constants";
import { getEventTestId } from "../../../src/components/Calendar/Event/constants";
import {
    CELL_HOUR_HEIGHT,
    CREATE_EVENT_ID,
} from "../../../src/constants/calendar";
import GoogleOAuthBeforeAllHook from "../../_hooks/GoogleOAuth";
import expectHeight from "./_util/expectHeight";
import resizeY from "./resizeY";
import { dragToNextCell, expectOnNextCell } from "./dragToNextCell";

const baseUrl = "http://127.0.0.1:3000/__test__/calendar";

test.beforeAll(async () => {
    // INFO: you need to be already authenticated to google for this test to work
    await GoogleOAuthBeforeAllHook();
});

test.beforeEach(async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);
    await gotoSafe(page, baseUrl);
});

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
    await resizeY(page, event, CELL_HOUR_HEIGHT, CREATE_EVENT_ID);

    // Wait for the element to reach the expected size
    await expectHeight(event, 2 * CELL_HOUR_HEIGHT);

    //
    //  Drag
    //
    const dragStats = await dragToNextCell(page, event, CELL_TESTID);

    // 4. Wait for any drag animations/transitions to complete
    await page.waitForTimeout(1000);

    await expectOnNextCell(event, dragStats);
});
