import {
    CalendarDayViewProps,
    CalendarMonthViewProps,
    CalendarProps,
    CalendarWeekViewProps,
    CalendarYearViewProps,
} from "@/components/Calendar/types";
import { ComponentType } from "react";

type CalendarGoogleDayViewProps = CalendarDayViewProps;
type CalendarGoogleWeekViewProps = CalendarWeekViewProps;
type CalendarGoogleMonthViewProps = CalendarMonthViewProps;
type CalendarGoogleYearViewProps = CalendarYearViewProps;

interface CalendarGoogleViewSlots {
    DayView: ComponentType<CalendarGoogleDayViewProps>;
    WeekView: ComponentType<CalendarGoogleWeekViewProps>;
    MonthView: ComponentType<CalendarGoogleMonthViewProps>;
    YearView: ComponentType<CalendarGoogleYearViewProps>;
}

interface CalendarGoogleProps extends Omit<CalendarProps, "ViewSlots"> {
    ViewSlots?: Partial<CalendarGoogleViewSlots>;
}

export type { CalendarGoogleProps };
