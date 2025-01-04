import { DAY_CELL_HEIGHT, START_HOUR } from "@/constants/calendar";

const calculateNewDates = (targetCell: HTMLElement, elementRect: DOMRect) => {
    const cellDate = targetCell.getAttribute("data-date");
    const cellRect = targetCell.getBoundingClientRect();

    if (!cellDate) {
        console.warn("No date attribute found on target cell");
        return null;
    }

    // Calculate start time from top position
    const relativeTop = elementRect.top - cellRect.top;
    const hoursFromTop = relativeTop / DAY_CELL_HEIGHT;

    const startTotalHours = START_HOUR + hoursFromTop;
    const startHours = Math.floor(startTotalHours);
    const startMinutes = Math.round((startTotalHours - startHours) * 60);

    // Calculate end time based on element height
    const durationHours = elementRect.height / DAY_CELL_HEIGHT;
    const endTotalHours = startTotalHours + durationHours;
    const endHours = Math.floor(endTotalHours);
    const endMinutes = Math.round((endTotalHours - endHours) * 60);

    // Create dates with calculated times
    const startDate = new Date(cellDate);
    const endDate = new Date(cellDate);

    // Get timezone offset in minutes
    const timezoneOffset = startDate.getTimezoneOffset();

    // Set hours and minutes for both dates, adjusting for timezone
    startDate.setHours(startHours, startMinutes - timezoneOffset, 0, 0);
    endDate.setHours(endHours, endMinutes - timezoneOffset, 0, 0);

    return {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
    };
};

export default calculateNewDates;
