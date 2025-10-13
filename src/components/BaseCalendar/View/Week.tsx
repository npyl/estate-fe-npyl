import React, { CSSProperties } from "react";
import { BaseCalendarWeekViewProps } from "../types";
import { EmptyCell, NoNumbering } from "./Empty";
import useWeekUtils from "../useWeekUtils";
import { GRID_VIEW_ID } from "../constants";
import BaseContainer from "./_BaseContainer";

// ------------------------------------------------------------

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
    const { getStartOfWeek } = useWeekUtils();

    const startOfWeek = getStartOfWeek(date);

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        return day;
    });

    return (
        <BaseContainer Numbering={Numbering} {...props}>
            <div id={GRID_VIEW_ID} style={gridStyle}>
                {weekDays.map((day) => (
                    <Cell key={day.toISOString()} date={day} />
                ))}
            </div>
        </BaseContainer>
    );
};

export default WeekView;
