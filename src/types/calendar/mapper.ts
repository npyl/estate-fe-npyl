import { TCalendarEvent } from "@/components/Calendar/types";
import { calendar_v3 } from "@googleapis/calendar";
import { getAllDayStartEnd } from "@/components/Calendar/util";

/**
    From Google Docs: 
    (https://developers.google.com/calendar/api/v3/reference/events)

    start.date:
        The date, in the format "yyyy-mm-dd", if this is an all-day event.
    start.dateTime:
        The time, as a combined date-time value (formatted according to RFC3339).
        A time zone offset is required unless a time zone is explicitly specified in timeZone.

    INFO: Basically, we always look at `dateTime` field, unless we realise that we have an "all-day" event.
            In case of "all-day" event, google populates *only* the `date` field
*/

const GCalendarToTCalendarEvent = ({
    id,
    summary,
    start,
    end,
    description,
    location,
}: calendar_v3.Schema$Event): TCalendarEvent => {
    const isAllDay =
        !start?.dateTime &&
        !end?.dateTime &&
        Boolean(start?.date) &&
        Boolean(end?.date);

    let startDate: string;
    let endDate: string;

    if (isAllDay) {
        [startDate, endDate] = getAllDayStartEnd(start?.date!);
    } else {
        startDate = start?.dateTime || "";
        endDate = end?.dateTime || "";
    }

    return {
        id: id!,
        title: summary || "",
        location: location || "",
        description: description || "",
        startDate,
        endDate,
        type: {
            id: 1,
            color: "red",
            name: "test",
        },
        withIds: [],
    };
};

const TCalendarEventToGCalendarEvent = ({
    id,
    title,
    description,
    startDate,
    endDate,
    location,
    type,
    withIds,
}: TCalendarEvent): calendar_v3.Schema$Event => {
    console.log("start: ", startDate, " end: ", endDate);

    return {
        id,
        summary: title,
        description,
        start: {
            dateTime: startDate,
            timeZone: "UTC",
        },
        end: {
            dateTime: endDate,
            timeZone: "UTC",
        },
        location,
    };
};

export { TCalendarEventToGCalendarEvent, GCalendarToTCalendarEvent };
