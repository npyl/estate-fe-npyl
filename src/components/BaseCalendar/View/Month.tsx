import { ComponentType, CSSProperties, FC } from "react";
import { BaseCalendarCellProps, BaseCalendarMonthViewProps } from "../types";
import { EmptyCell } from "./Empty";

const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    width: "100%",
};

const DAYS_IN_WEEK = 7;

interface IDay {
    date: Date;
    isCurrentMonth: boolean;
}

interface IAllDays {
    weekDays: Date[];
    calendarDays: IDay[];
}

const getDays = (date: Date): IAllDays => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startOffset = firstDay.getDay();

    const totalDays = startOffset + daysInMonth;
    const totalCells = Math.ceil(totalDays / DAYS_IN_WEEK) * DAYS_IN_WEEK;

    // Generate week days
    const weekStart = new Date(year, month, 1 - firstDay.getDay());
    const weekDays = Array.from({ length: DAYS_IN_WEEK }, (_, i) => {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + i);
        return day;
    });

    // Generate calendar days
    const calendarDays = Array.from({ length: totalCells }, (_, index) => {
        const dayOffset = index - startOffset + 1;
        const currentDate = new Date(year, month, dayOffset);
        return {
            date: currentDate,
            isCurrentMonth: dayOffset > 0 && dayOffset <= daysInMonth,
        };
    });

    return { weekDays, calendarDays };
};

const getHeadCell =
    (HeadCell: ComponentType<BaseCalendarCellProps>) => (day: Date) => (
        <HeadCell key={day.toISOString()} date={day} />
    );

const getDayCell =
    (
        Cell: ComponentType<BaseCalendarCellProps>,
        PlaceholderCell: ComponentType<BaseCalendarCellProps>
    ) =>
    ({ date, isCurrentMonth }: IDay) => {
        const Component = isCurrentMonth ? Cell : PlaceholderCell;
        return <Component key={date.toISOString()} date={date} />;
    };

const MonthView: FC<BaseCalendarMonthViewProps> = ({
    date,
    HeadCell = EmptyCell,
    PlaceholderCell = EmptyCell,
    Cell = EmptyCell,
}) => {
    const { weekDays, calendarDays } = getDays(date);

    return (
        <div style={gridStyle}>
            {/* Heads */}
            {weekDays.map(getHeadCell(HeadCell))}

            {/* Actual Cells */}
            {calendarDays.map(getDayCell(Cell, PlaceholderCell))}
        </div>
    );
};

export default MonthView;
