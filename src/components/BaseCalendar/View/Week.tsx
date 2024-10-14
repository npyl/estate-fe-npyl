import React, { CSSProperties } from "react";
import { BaseCalendarWeekViewProps } from "../types";
import { EmptyCell, NoNumbering } from "./Empty";

// ------------------------------------------------------------

const defaultStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
};

const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    width: "100%",
};

// ------------------------------------------------------------

const WeekView: React.FC<BaseCalendarWeekViewProps> = ({
    date,
    Cell = EmptyCell,
    Numbering = NoNumbering,
    style,
    ...props
}) => {
    const startOfWeek = new Date(date);

    startOfWeek.setDate(date.getDate() - date.getDay());

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        return day;
    });

    return (
        <div
            {...props}
            style={{
                ...defaultStyle,
                ...style,
            }}
        >
            <Numbering />

            <div style={gridStyle}>
                {weekDays.map((day) => (
                    <Cell key={day.toISOString()} date={day} />
                ))}
            </div>
        </div>
    );
};

export default WeekView;
