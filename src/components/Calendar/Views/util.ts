import { TCalendarEvent } from "../types";
import { isSameDay } from "../util";

const getTimeFromISO = (s: string) => {
    return s.split("T")[1].substring(0, 5);
};

const getOverlapCount = (startDate: string, map: Map<string, string>) => {
    const startTime = getTimeFromISO(startDate);
    let count = 0;

    map.forEach((rangeEnd, rangeStart) => {
        // INFO: lexicographically compare strings
        if (startTime >= rangeStart && startTime <= rangeEnd) {
            count++;
        }
    });

    return count;
};

const _getTodaysEvents = (events: TCalendarEvent[], date: Date) =>
    events.filter((event) => isSameDay(new Date(event.startDate), date));

export { _getTodaysEvents, getOverlapCount, getTimeFromISO };
