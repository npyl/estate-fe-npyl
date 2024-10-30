import { CSSProperties, FC } from "react";
import { BaseCalendarYearViewProps } from "../types";
import { EmptyCell } from "./Empty";

const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    width: "100%",
};

const YearView: FC<BaseCalendarYearViewProps> = ({
    date,
    Cell = EmptyCell,
}) => {
    const year = date.getFullYear();

    const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

    return (
        <div style={gridStyle}>
            {months.map((monthDate, i) => (
                <Cell key={i} date={monthDate} />
            ))}
        </div>
    );
};

export default YearView;
