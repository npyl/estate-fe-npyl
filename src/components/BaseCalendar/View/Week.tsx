import React from "react";
import { BaseCalendarWeekViewProps } from "../types";

const WeekView: React.FC<BaseCalendarWeekViewProps> = ({
    date,
    Cell,
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
        <div {...props}>
            {weekDays.map((day) => (
                <Cell key={day.toISOString()} date={day} />
            ))}
        </div>
    );
};

export default WeekView;
