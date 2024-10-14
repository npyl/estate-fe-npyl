import {
    BaseCalendarProps,
    TCalendarView,
} from "@/components/BaseCalendar/types";
import { HTMLAttributes } from "react";

type TCalendarEventType = {
    id: number;
    name: string;
    color: string; // hex (with #) or mui pallete supported (e.g. primary.light)
};

type TCalendarEvent = {
    id: number;
    title: string;
    type: TCalendarEventType;
    location: string; // ?
    startDate: Date; // day-time
    endDate: Date; // day-time
    withIds: number[];
};

interface CalendarNumberingProps extends HTMLAttributes<HTMLDivElement> {}

interface CalendarProps
    extends Omit<
        BaseCalendarProps,
        "date" | "view" | "onDateChange" | "onViewChange"
    > {
    initialView?: TCalendarView;
}

export type {
    TCalendarEvent,
    TCalendarEventType,
    // ...
    CalendarNumberingProps,
    // ...
    CalendarProps,
};
