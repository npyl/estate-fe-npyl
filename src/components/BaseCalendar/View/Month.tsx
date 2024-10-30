import { CSSProperties, FC } from "react";
import { BaseCalendarMonthViewProps } from "../types";
import { EmptyCell } from "./Empty";

const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    width: "100%",
};

const DAYS_IN_WEEK = 7;

const getDays = (date: Date) => {
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
            {weekDays.map((day) => (
                <HeadCell key={day.toISOString()} date={day} />
            ))}

            {/* Actual Cells */}
            {calendarDays.map(({ date, isCurrentMonth }, index) =>
                isCurrentMonth ? (
                    <Cell key={`cell-${index}`} date={date} />
                ) : (
                    <PlaceholderCell key={`empty-${index}`} date={date} />
                )
            )}
        </div>
    );
};

export default MonthView;
