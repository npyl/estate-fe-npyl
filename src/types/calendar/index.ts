import { TCalendarEvent } from "@/components/Calendar/types";

interface CalendarEventReq extends Omit<TCalendarEvent, "id"> {
    id?: string;
}

export type { CalendarEventReq };
