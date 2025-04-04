const UPDATE_DATES_NAME = "onUpdateDates";

interface DatesDetail {
    startDate: string;
    endDate: string;
}

const getEvent = (startDate: string, endDate: string) =>
    new CustomEvent<DatesDetail>(UPDATE_DATES_NAME, {
        detail: { startDate, endDate },
    });

/**
 * Sends a custom event to the Create Event Popper to update dates after a drag or resize
 */
const dispatchUpdateDates = (startDate: string, endDate: string) => {
    const EV = getEvent(startDate, endDate);
    document.dispatchEvent(EV);
};

export type { DatesDetail };
export { UPDATE_DATES_NAME, dispatchUpdateDates };
