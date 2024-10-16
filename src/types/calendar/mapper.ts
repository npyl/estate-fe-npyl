import { TCalendarEvent } from "@/components/Calendar/types";
import { calendar_v3 } from "@googleapis/calendar";

const GCalendarToTCalendarEvent = ({
    iCalUID,
    summary,
    start,
    end,
}: calendar_v3.Schema$Event): TCalendarEvent => ({
    id: iCalUID!,
    title: summary || "",
    location: "",
    startDate: start?.dateTime || "",
    endDate: end?.dateTime || "",
    type: {
        id: 1,
        color: "red",
        name: "test",
    },
    withIds: [],
});

export { GCalendarToTCalendarEvent };
