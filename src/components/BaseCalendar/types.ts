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

interface BaseCalendarNumberingProps {}

interface BaseCalendarCellProps extends HTMLAttributes<HTMLDivElement> {
    /* 
        INFO: represents a date not particularly today; tied to the cell content
            This is different than the date passed from top (BaseCalendar) until bottom (___View, e.g. DayView, etc.)  
    */
    date: Date;
}

// --------------------------------------------------------------

interface ViewProps extends HTMLAttributes<HTMLDivElement> {
    date: Date;

    Cell?: ComponentType<BaseCalendarCellProps>;
    Numbering?: ComponentType<BaseCalendarNumberingProps>;
}

interface BaseCalendarDayViewProps extends ViewProps {}
interface BaseCalendarWeekViewProps extends ViewProps {}
interface BaseCalendarMonthViewProps extends Omit<ViewProps, "Numbering"> {
    HeadCell?: ComponentType<BaseCalendarCellProps>;
    PlaceholderCell?: ComponentType<BaseCalendarCellProps>;
}
interface BaseCalendarYearViewProps extends Omit<ViewProps, "Numbering"> {}

// --------------------------------------------------------------

interface BaseCalendarViewSlots {
    DayView: ComponentType<BaseCalendarDayViewProps>;
    WeekView: ComponentType<BaseCalendarWeekViewProps>;
    MonthView: ComponentType<BaseCalendarMonthViewProps>;
    YearView: ComponentType<BaseCalendarYearViewProps>;
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
    BaseCalendarCellProps,
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
