import { getCellTestId } from "../../../src/components/Calendar/Views/BaseCell";
import { START_OF_WEEK_ID } from "../../../src/sections/__test__/CalendarGoogle/constants";
import { getEventTestId } from "../../../src/components/Calendar/Event/constants";
import {
    CELL_HOUR_HEIGHT,
    CREATE_EVENT_ID,
} from "../../../src/constants/calendar";
import expectHeight from "./_util/expectHeight";
import { Page } from "@playwright/test";
import removeAllEvents from "./_util/removeAllEvents";

const getWeekStartDate = (page: Page) =>
    page.getByTestId(START_OF_WEEK_ID).innerText();

const safeReload = (page: Page) => page.reload({ waitUntil: "networkidle" });

const getNextDay = (date: string) =>
    new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000).toISOString();

/**
 * Clicks on the first weekday's cell and an event with its popover pops up
 * @param page
 */
const makeEvent = async (page: Page) => {
    // 1. week start as start date
    const startDate = await getWeekStartDate(page);
    const nextDate = getNextDay(startDate);

    // 2. remove all events of first week day and next of that
    await removeAllEvents(startDate);
    await removeAllEvents(nextDate);

    // 3. make sure ui is also on track with this change
    await safeReload(page);

    // 4. click on week start cell
    const CELL_TESTID = getCellTestId(startDate);
    const cell = page.getByTestId(CELL_TESTID);
    await cell.click();

    // 5. wait for "create-event" to appear
    const event = page.getByTestId(getEventTestId(CREATE_EVENT_ID));
    await event.waitFor({ state: "visible" });

    // 6. expect "create-event" height to be 60px
    await expectHeight(event, CELL_HOUR_HEIGHT);

    return { startDate, cell };
};

export default makeEvent;
