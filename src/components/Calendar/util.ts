import { END_HOUR, START_HOUR } from "@/constants/calendar";

/**
 * Converts a UTC date string to Greek time (Athens timezone)
 */
const toGreekTime = (dateString: string): Date => {
    const date = new Date(dateString);
    return new Date(
        date.toLocaleString("en-US", { timeZone: "Europe/Athens" })
    );
};

/**
 * Checks if two dates are on the same calendar day
 */
const isSameDay = (date1: Date, date2: Date): boolean => {
    const d1 = toGreekTime(date1.toISOString());
    const d2 = toGreekTime(date2.toISOString());

    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
};

/**
 * Checks if an event spans an entire day by comparing its start and end times
 * against the defined START_HOUR and END_HOUR in Greek time
 */
const isAllDay = (startDate: string, endDate: string): boolean => {
    try {
        console.log("RECEIVED: ", startDate, endDate);

        // Convert UTC ISO strings to Greek time
        const start = toGreekTime(startDate);
        const end = toGreekTime(endDate);

        const isSameDate = isSameDay(start, end);
        const isSTART_HOUR = start.getHours() === START_HOUR;
        const isEND_HOUR = end.getHours() === END_HOUR;

        console.log(
            "isSameDAy: ",
            isSameDate,
            " START: ",
            isSTART_HOUR,
            " END: ",
            isEND_HOUR
        );

        return isSameDate && isSTART_HOUR && isEND_HOUR;
    } catch (ex) {
        // alert("(npyl): EDW!");
        console.error(ex);
        return false;
    }
};

const getAllDayStartEnd = (start: string) => {
    const startDateTime = new Date(start);
    const endDateTime = new Date(start);

    startDateTime.setHours(START_HOUR, 0, 0, 0);
    endDateTime.setHours(END_HOUR, 0, 0, 0);

    return [startDateTime.toISOString(), endDateTime.toISOString()] as const;
};

export { isSameDay, isAllDay, toGreekTime, getAllDayStartEnd };
