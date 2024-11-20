import {
    isTCalendarEventType,
    TCalendarEvent,
    TCalendarEventExtendedProperties,
    TCalendarEventPerson,
    TCalendarEventType,
} from "@/components/Calendar/types";
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

const PP_EVENT_TYPE_KEY = "pp-event-type";
const PP_EVENT_PEOPLE_KEY = "pp-event-people";

const extractPeople = (
    extendedProperties?: TCalendarEventExtendedProperties | null
) => {
    try {
        const field = extendedProperties?.private?.[PP_EVENT_PEOPLE_KEY];
        if (!field) return [];

        const people =
            (JSON.parse(field) as unknown as TCalendarEventPerson[]) || [];

        return people;
    } catch (ex) {
        return [];
    }
};

const GCalendarToTCalendarEvent = ({
    id,
    summary,
    start,
    end,
    description,
    location,
    extendedProperties,
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

    const type = extendedProperties?.private?.[PP_EVENT_TYPE_KEY];
    const people = extractPeople(extendedProperties);

    return {
        id: id!,
        title: summary || "",
        location: location || "",
        description: description || "",
        startDate,
        endDate,
        type: isTCalendarEventType(type) ? type : "TASK",
        people,
        extendedProperties,
    };
};

type TCalendarEventReq = Omit<TCalendarEvent, "id"> & { id?: string };

const withGwEmail = ({ gwEmail }: TCalendarEventPerson) => Boolean(gwEmail);
const withoutGwEmail = ({ gwEmail }: TCalendarEventPerson) => !Boolean(gwEmail);

/**
 * Convert `people` field of TCalendarEvent to an entry valid for google calendar event's extendedProperties.
 * Depending on the type we have to select *only* the entries that correspond. This is very important and must be
 *  enforced for cases where a user changes the calendar's event type from e.g. MEETING to TOUR_XX
 * Specifically,
 *  - for MEETING, we need all entries *WITH* gwEmail
 *  - for TOUR_XX, we need all entries *WITHOUT* gwEmail
 */
const preparePeople = (
    people: TCalendarEventPerson[],
    type: TCalendarEventType
) => {
    if (type === "TASK") return JSON.stringify([]);

    const filtered =
        type === "MEETING"
            ? people?.filter(withGwEmail)
            : people?.filter(withoutGwEmail);

    return JSON.stringify(filtered);
};

const TCalendarEventToGCalendarEvent = ({
    id,
    title,
    description,
    startDate,
    endDate,
    location,
    extendedProperties,
    type,
    people,
}: TCalendarEventReq): calendar_v3.Schema$Event => {
    console.log("start: ", startDate, " end: ", endDate);

    console.log("allPeople: ", people);
    const preparedPeople = preparePeople(people, type);
    console.log("prepared: ", preparedPeople);

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

        extendedProperties: {
            shared: extendedProperties?.shared,
            private: {
                ...extendedProperties?.private,
                [PP_EVENT_TYPE_KEY]: type,
                [PP_EVENT_PEOPLE_KEY]: preparePeople(people, type),
            },
        },
    };
};

export {
    TCalendarEventToGCalendarEvent,
    GCalendarToTCalendarEvent,
    // ...
    withGwEmail,
    withoutGwEmail,
};
