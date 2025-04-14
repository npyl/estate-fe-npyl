import {
    BaseCalendarCellProps,
    BaseCalendarDayViewProps,
    BaseCalendarHeaderProps,
    BaseCalendarHeaderSlots,
    BaseCalendarMonthViewProps,
    BaseCalendarSlots,
    BaseCalendarViewProps,
    BaseCalendarWeekViewProps,
    BaseCalendarYearViewProps,
    TCalendarView,
} from "@/components/BaseCalendar/types";
import { ComponentType, HTMLAttributes, MouseEvent } from "react";

/**
 * This type is generated from a `calendar_v3.Schema$ColorDefinition` entry (key, value pair)
 * id: matches colorId
 * color: matches background (hex)
 */
type TCalendarColor = {
    id: string;
    color: string;
};

const CALENDAR_COLOR_FALLBACK = "1";

type TCalendarEventExtendedProperties = {
    private?: {
        [key: string]: string;
    };
    shared?: {
        [key: string]: string;
    };
};

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
    colorId: string;
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

type TOnEventClick = (
    me: MouseEvent<HTMLDivElement>,
    ce: TCalendarEvent
) => void;

type TOnEventDragEnd = (
    ce: TCalendarEvent,
    startDate: string,
    endDate: string
) => void;

type TOnEventResizeEnd = (ce: TCalendarEvent, h: number) => void;
type TOnEventResizeEndAsync = (
    ce: TCalendarEvent,
    h: number
) => Promise<boolean>;

interface CalendarCellProps extends BaseCalendarCellProps {
    events: TCalendarEvent[];

    onEventClick?: TOnEventClick;
    onEventDragEnd?: TOnEventDragEnd;
    onEventResizeEnd?: TOnEventResizeEnd;

    getMiscCellEvents: TGetMiscCellEventsCb;
}

interface CalendarNumberingProps extends HTMLAttributes<HTMLDivElement> {}

// ------------------------------------------------------------------------

interface CalendarHeaderProps extends BaseCalendarHeaderProps {}
interface CalendarViewProps extends BaseCalendarViewProps {}

interface CalendarSlots<
    H extends CalendarHeaderProps = CalendarHeaderProps,
    V extends CalendarViewProps = CalendarViewProps
> extends BaseCalendarSlots<H, V> {}

// ------------------------------------------------------------------------

interface CalendarHeaderSlots extends BaseCalendarHeaderSlots {}

// ------------------------------------------------------------------------

type TGetCellEventsCb = (
    events: TCalendarEvent[],
    date: Date
) => TCalendarEvent[];

type TGetMiscCellEventsCb = (
    events: TCalendarEvent[]
) => [TCalendarEvent[], TCalendarEvent[]];

/**
 * @param miscEvents events shown at the top of the cell; they are compact and can represent allDay events or notes or anything of general manner
 */
interface ViewEvents {
    events?: TCalendarEvent[];
    miscEvents?: TCalendarEvent[];
    filters?: object;
    getCellEvents?: TGetCellEventsCb;
    getMiscCellEvents?: TGetMiscCellEventsCb;

    onEventClick?: TOnEventClick;
    onEventDragEnd?: TOnEventDragEnd;
    onEventResizeEnd?: TOnEventResizeEnd;
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

export { isTCalendarEventType, CALENDAR_COLOR_FALLBACK };

export type {
    // ...
    TCalendarEvent,
    TCalendarEventType,
    TCalendarEventPerson,
    TCalendarEventExtendedProperties,
    TCalendarColor,

    // ...
    TGetCellEventsCb,
    TGetMiscCellEventsCb,
    CalendarNumberingProps,

    // ...
    TOnEventClick,
    TOnEventDragEnd,
    TOnEventResizeEnd,
    TOnEventResizeEndAsync,

    // ...
    CalendarHeaderProps,
    CalendarViewProps,
    CalendarCellProps,
    // ...
    CalendarDayViewProps,
    CalendarWeekViewProps,
    CalendarMonthViewProps,
    CalendarYearViewProps,
    // ...
    CalendarProps,
};
