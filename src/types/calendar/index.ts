import { TCalendarEvent } from "@/components/Calendar/types";

type TCalendarIdFilter = "ADMIN_ALL" | ""; // TODO: somehow explain we want anything & ADMIN_ALL supported

interface CalendarEventReq extends Omit<TCalendarEvent, "id"> {
    id?: string;
}

export type { CalendarEventReq, TCalendarIdFilter };
