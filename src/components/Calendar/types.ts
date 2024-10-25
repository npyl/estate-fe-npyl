import {
    BaseCalendarCellProps,
    BaseCalendarDayViewProps,
    BaseCalendarHeaderSlots,
    BaseCalendarMonthViewProps,
    BaseCalendarSlots,
    BaseCalendarWeekViewProps,
    BaseCalendarYearViewProps,
    TCalendarView,
} from "@/components/BaseCalendar/types";
import { ComponentType, HTMLAttributes } from "react";

type TCalendarEventType = "TASK" | "MEETING" | "TOUR_ONLINE" | "TOUR_INPERSON";

type TCalendarEvent = {
    id: string;
    title: string;
    description: string;
    type: TCalendarEventType;
    location: string; // ?
    startDate: string; // day-time
    endDate: string; // day-time
    withIds: number[];

    /**
     * INFO: see https://developers.google.com/calendar/api/v3/reference/events
     * This field is an 1-1 copy of google's respective field.
     * We have this copy so that when we make changes to it, we don't overwrite other potential applications' data
     */
    extendedProperties?: {
        private?: {
            [key: string]: string;
        };
        shared?: {
            [key: string]: string;
        };
    } | null;
};

// ------------------------------------------------------------------------

interface CalendarCellProps extends BaseCalendarCellProps {
    events: TCalendarEvent[];
    onEventClick?: (e: TCalendarEvent) => void;
}

interface CalendarNumberingProps extends HTMLAttributes<HTMLDivElement> {}

// ------------------------------------------------------------------------

interface CalendarSlots extends BaseCalendarSlots {}

// ------------------------------------------------------------------------

interface CalendarHeaderSlots extends BaseCalendarHeaderSlots {}

// ------------------------------------------------------------------------

interface ViewEvents {
    events?: TCalendarEvent[];

    getCellEvents?: (events: TCalendarEvent[], date: Date) => TCalendarEvent[];

    onEventClick?: (e: TCalendarEvent) => void;
}

type CalendarDayViewProps = BaseCalendarDayViewProps & ViewEvents;
type CalendarWeekViewProps = BaseCalendarWeekViewProps & ViewEvents;
type CalendarMonthViewProps = BaseCalendarMonthViewProps & ViewEvents;
type CalendarYearViewProps = BaseCalendarYearViewProps & ViewEvents;

interface CalendarViewSlots {
    DayView: ComponentType<CalendarDayViewProps>;
    WeekView: ComponentType<CalendarWeekViewProps>;
    MonthView: ComponentType<CalendarMonthViewProps>;
    YearView: ComponentType<CalendarYearViewProps>;
}

// ------------------------------------------------------------------------

interface CalendarProps {
    initialView?: TCalendarView;
    // ...
    slots?: Partial<CalendarSlots>;
    // ...
    HeaderSlots?: Partial<CalendarHeaderSlots>;
    ViewSlots?: Partial<CalendarViewSlots>;
}

export type {
    TCalendarEvent,
    TCalendarEventType,
    // ...
    CalendarCellProps,
    CalendarNumberingProps,
    // ...
    CalendarDayViewProps,
    CalendarWeekViewProps,
    CalendarMonthViewProps,
    CalendarYearViewProps,
    // ...
    CalendarProps,
};
