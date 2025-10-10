import { test } from "@playwright/experimental-ct-react";
import gotoSafe from "../../_util/gotoSafe";
import {
    CALENDAR_SEARCH_TESTID,
    CALENDAR_SEARCH_POPOVER_TESTID,
    getOptionTestId,
} from "../../../src/sections/Calendar/Filters/Search/constants";
import { TCalendarEvent } from "../../../src/components/Calendar/types";
import { getEventTestId } from "../../../src/components/Calendar/Event/constants";
import { getPopoverTestId } from "../../../src/sections/Calendar/Event/Popover/constants";

const EVENT_ID = "event-1";
const COMMON_KEYWORD = "Meeting";

const mockEvents: TCalendarEvent[] = [
    {
        id: EVENT_ID,
        title: `Team ${COMMON_KEYWORD}`,
        description: "Weekly sync",
        type: "MEETING",
        colorId: "1",
        people: [],
        location: "Conference Room A",
        extendedProperties: null,

        // INFO: some really old dates
        startDate: "2000-08-15T10:00:00Z",
        endDate: "2000-08-15T11:00:00Z",
    },
];

const baseUrl = "http://127.0.0.1:3000/__test__/calendar";

test.beforeEach(async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);

    // Mock the getEvents API endpoint
    await page.route(`**/calendar/*/events/get*`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(mockEvents),
        });
    });

    // Mock the search events API endpoint
    await page.route(`**/calendar/*/events/search*`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(mockEvents),
        });
    });

    await gotoSafe(page, baseUrl);
});

test("Search, Choose Event & Click", async ({ page }) => {
    // 0. click search
    page.getByTestId(CALENDAR_SEARCH_TESTID).click();

    // 1. Type in search input (adjust selector as needed)
    await page
        .getByTestId(CALENDAR_SEARCH_TESTID)
        .locator('input[type="text"]')
        .fill(COMMON_KEYWORD);

    // 2. wait popover to appear
    await page.getByTestId(CALENDAR_SEARCH_POPOVER_TESTID).waitFor({
        state: "visible",
    });

    // 3. Click 1st option
    const OPTION_TESTID = getOptionTestId(EVENT_ID);
    await page.getByTestId(OPTION_TESTID).click();

    // 4. Wait for calendar's date to go ...

    // 5. Check if Event exists
    const EVENT_TESTID = getEventTestId(EVENT_ID);
    await page.getByTestId(EVENT_TESTID).waitFor({ state: "visible" });

    // 6. Check if it was clicked (a.k.a. the view popover is open)
    const EVENT_POPOVER_TESTID = getPopoverTestId(EVENT_ID);
    await page.getByTestId(EVENT_POPOVER_TESTID).waitFor({ state: "visible" });
});
