import { ButtonHTMLAttributes, HTMLAttributes, ComponentType } from "react";

type TCalendarView = "day" | "week" | "month" | "year";
type TWeekViewMode = "monToSun" | "sunToSat";

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

interface ViewProps<
    CellProps extends BaseCalendarCellProps = BaseCalendarCellProps
> extends HTMLAttributes<HTMLDivElement> {
    date: Date;

    Cell?: ComponentType<CellProps>;
    Numbering?: ComponentType<BaseCalendarNumberingProps>;
}

interface BaseCalendarDayViewProps<
    CellProps extends BaseCalendarCellProps = BaseCalendarCellProps
> extends ViewProps<CellProps> {}
interface BaseCalendarWeekViewProps<
    CellProps extends BaseCalendarCellProps = BaseCalendarCellProps
> extends ViewProps<CellProps> {}

interface BaseCalendarMonthViewProps<
    CellProps extends BaseCalendarCellProps = BaseCalendarCellProps
> extends Omit<ViewProps<CellProps>, "Numbering"> {
    HeadCell?: ComponentType<BaseCalendarCellProps>;
    PlaceholderCell?: ComponentType<BaseCalendarCellProps>;
}
interface BaseCalendarYearViewProps<
    CellProps extends BaseCalendarCellProps = BaseCalendarCellProps
> extends Omit<ViewProps<CellProps>, "Numbering"> {}

// --------------------------------------------------------------

interface BaseCalendarViewSlots<
    DayViewProps extends BaseCalendarDayViewProps = BaseCalendarDayViewProps,
    WeekViewProps extends BaseCalendarWeekViewProps = BaseCalendarWeekViewProps,
    MonthViewProps extends BaseCalendarMonthViewProps = BaseCalendarMonthViewProps,
    YearViewProps extends BaseCalendarYearViewProps = BaseCalendarYearViewProps
> {
    DayView: ComponentType<DayViewProps>;
    WeekView: ComponentType<WeekViewProps>;
    MonthView: ComponentType<MonthViewProps>;
    YearView: ComponentType<YearViewProps>;
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

interface BaseCalendarProps extends HTMLAttributes<HTMLDivElement> {
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
    TWeekViewMode,
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
