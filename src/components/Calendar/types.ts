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

type TCalendarLocale = "en-US" | "el-GR";

const CALENDAR_EVENT_TYPES = [
    "TASK",
    "MEETING",
    "TOUR_ONLINE",
    "TOUR_INPERSON",
] as const;

type TCalendarEventType = (typeof CALENDAR_EVENT_TYPES)[number];

// INFO: type guard
const isTCalendarEventType = (value: unknown): value is TCalendarEventType =>
    typeof value === "string" &&
    CALENDAR_EVENT_TYPES.includes(value as TCalendarEventType);

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

type TGetCellEventsCb = (
    events: TCalendarEvent[],
    date: Date
) => TCalendarEvent[];

interface ViewEvents {
    events?: TCalendarEvent[];
    getCellEvents?: TGetCellEventsCb;
    onEventClick?: (e: TCalendarEvent) => void;
}

type CalendarDayViewProps<
    CellProps extends CalendarCellProps = CalendarCellProps
> = BaseCalendarDayViewProps<CellProps> & ViewEvents;
type CalendarWeekViewProps<
    CellProps extends CalendarCellProps = CalendarCellProps
> = BaseCalendarWeekViewProps<CellProps> & ViewEvents;
type CalendarMonthViewProps<
    CellProps extends CalendarCellProps = CalendarCellProps
> = BaseCalendarMonthViewProps<CellProps> & ViewEvents;
type CalendarYearViewProps<
    CellProps extends CalendarCellProps = CalendarCellProps
> = BaseCalendarYearViewProps<CellProps> & ViewEvents;

interface CalendarViewSlots {
    DayView: ComponentType<CalendarDayViewProps>;
    WeekView: ComponentType<CalendarWeekViewProps>;
    MonthView: ComponentType<CalendarMonthViewProps>;
    YearView: ComponentType<CalendarYearViewProps>;
}

// ------------------------------------------------------------------------

interface CalendarProps {
    initialView?: TCalendarView;

    date?: Date;
    onDateChange?: (d: Date) => void;
    view?: TCalendarView;
    onViewChange?: (v: TCalendarView) => void;
    // ...
    slots?: Partial<CalendarSlots>;
    // ...
    HeaderSlots?: Partial<CalendarHeaderSlots>;
    ViewSlots?: Partial<CalendarViewSlots>;
}

export { isTCalendarEventType };

export type {
    TCalendarLocale,

    // ...
    TCalendarEvent,
    TCalendarEventType,

    // ...
    TGetCellEventsCb,
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
