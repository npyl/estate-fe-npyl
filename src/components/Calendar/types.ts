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
import { ComponentType, HTMLAttributes, MouseEvent } from "react";

type TCalendarEventExtendedProperties = {
    private?: {
        [key: string]: string;
    };
    shared?: {
        [key: string]: string;
    };
};

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

type TCalendarEventPerson = {
    customerId?: number;
    // ...
    firstName?: string;
    lastName?: string;
    // ...
    gwEmail?: string;
};

type TCalendarEvent = {
    id: string;
    title: string;
    description: string;
    type: TCalendarEventType;
    people: Partial<TCalendarEventPerson>[];
    location: string; // INFO: must be in google expected format in order for it to open in Maps
    startDate: string; // day-time
    endDate: string; // day-time

    /**
     * INFO: see https://developers.google.com/calendar/api/v3/reference/events
     * This field is an 1-1 copy of google's respective field.
     * We have this copy so that when we make changes to it, we don't overwrite other potential applications' data
     */
    extendedProperties?: TCalendarEventExtendedProperties | null;
};

// ------------------------------------------------------------------------

type CalendarMouseEvent = MouseEvent<
    HTMLDivElement & { event: TCalendarEvent }
>;

// ------------------------------------------------------------------------

interface CalendarCellProps extends BaseCalendarCellProps {
    events: TCalendarEvent[];
    onEventClick?: (e: CalendarMouseEvent) => void;
    onEventDragEnd?: (
        e: TCalendarEvent,
        startDate: string,
        endDate: string
    ) => void;
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
    filters?: object;
    getCellEvents?: TGetCellEventsCb;
    onEventClick?: (e: CalendarMouseEvent) => void;
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
    CalendarMouseEvent,

    // ...
    TCalendarEvent,
    TCalendarEventType,
    TCalendarEventPerson,
    TCalendarEventExtendedProperties,

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
