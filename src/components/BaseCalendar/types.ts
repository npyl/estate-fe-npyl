import { ButtonHTMLAttributes, HTMLAttributes, ComponentType } from "react";

type TCalendarView = "day" | "week" | "month" | "year";

// -------------------------------------------------------------

type ButtonProps = {
    onClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

interface ViewButtonGroupProps {
    view: TCalendarView;
    onViewChange: (v: TCalendarView) => void;
}

interface BaseCalendarHeaderSlots {
    PreviousButton: ComponentType<ButtonProps>;
    TodayButton: ComponentType<ButtonProps>;
    NextButton: ComponentType<ButtonProps>;
    ViewButtonGroup: ComponentType<ViewButtonGroupProps>;
}

interface BaseCalendarHeaderProps extends HTMLAttributes<HTMLDivElement> {
    date: Date;
    onDateChange: (d: Date) => void;

    view: TCalendarView;
    onViewChange: (v: TCalendarView) => void;

    slots?: Partial<BaseCalendarHeaderSlots>;
}

// -------------------------------------------------------------

interface ViewProps {
    date: Date;
}

interface BaseCalendarDayViewProps extends ViewProps {}
interface BaseCalendarWeekViewProps extends ViewProps {}
interface BaseCalendarMonthViewProps extends ViewProps {}
interface BaseCalendarYearViewProps extends ViewProps {}
// ...
interface BaseCalendarCellProps {}

interface BaseCalendarViewSlots {
    DayView: ComponentType<BaseCalendarDayViewProps>;
    WeekView: ComponentType<BaseCalendarWeekViewProps>;
    MonthView: ComponentType<BaseCalendarMonthViewProps>;
    YearView: ComponentType<BaseCalendarYearViewProps>;
    // ...
    Cell: ComponentType<BaseCalendarCellProps>;
}

interface BaseCalendarViewProps extends HTMLAttributes<HTMLDivElement> {
    view: TCalendarView;
    date: Date;

    slots?: Partial<BaseCalendarViewSlots>;
}

// --------------------------------------------------------------

interface BaseCalendarSlots {
    Header: ComponentType<BaseCalendarHeaderProps>;
    View: ComponentType<BaseCalendarViewProps>;
}

interface BaseCalendarProps {
    date: Date;
    onDateChange: (d: Date) => void;
    view: TCalendarView;
    onViewChange: (v: TCalendarView) => void;
    // ...
    slots?: Partial<BaseCalendarSlots>;
    // ...
    HeaderSlots?: Partial<BaseCalendarHeaderSlots>;
    ViewSlots?: Partial<BaseCalendarViewSlots>;
}

// --------------------------------------------------------------

export type {
    TCalendarView,
    // ...
    BaseCalendarDayViewProps,
    BaseCalendarWeekViewProps,
    BaseCalendarMonthViewProps,
    BaseCalendarYearViewProps,
    // ...
    ViewButtonGroupProps,
    BaseCalendarHeaderProps,
    BaseCalendarHeaderSlots,
    // ...
    BaseCalendarViewProps,
    BaseCalendarViewSlots,
    // ...
    BaseCalendarProps,
    BaseCalendarSlots,
};
