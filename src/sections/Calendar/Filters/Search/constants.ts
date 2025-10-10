const CALENDAR_SEARCH_TESTID = "calendar-search-testid";
const CALENDAR_SEARCH_POPOVER_TESTID = "calendar-search-popover-testid";

const getOptionTestId = (eventId: string) =>
    `PPCalendarSearchPopover-Option-${eventId}`;

export {
    CALENDAR_SEARCH_TESTID,
    CALENDAR_SEARCH_POPOVER_TESTID,
    // ...
    getOptionTestId,
};
