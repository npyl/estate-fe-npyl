import {
    BaseCalendarCellProps,
    BaseCalendarDayViewProps,
    BaseCalendarHeaderSlots,
    BaseCalendarMonthViewProps,
    BaseCalendarProps,
    BaseCalendarSlots,
    BaseCalendarViewProps,
    BaseCalendarViewSlots,
    BaseCalendarWeekViewProps,
    BaseCalendarYearViewProps,
    TCalendarView,
} from "@/components/BaseCalendar/types";
import { ComponentType, HTMLAttributes } from "react";

type TCalendarEventType = {
    id: number;
    name: string;
    color: string; // hex (with #) or mui pallete supported (e.g. primary.light)
};

type TCalendarEvent = {
    id: string;
    title: string;
    type: TCalendarEventType;
    location: string; // ?
    startDate: string; // day-time
    endDate: string; // day-time
    withIds: number[];
};

// ------------------------------------------------------------------------

interface CalendarCellProps extends BaseCalendarCellProps {
    events: TCalendarEvent[];
    onEventEdit?: (id: string) => void;
    onEventDelete?: (id: string) => void;
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

    onEventEdit?: (id: string) => void;
    onEventDelete?: (id: string) => void;
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

interface CalendarViewProps extends BaseCalendarViewProps {
    onEventEdit?: (id: string) => void;
    onEventDelete?: (id: string) => void;
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
