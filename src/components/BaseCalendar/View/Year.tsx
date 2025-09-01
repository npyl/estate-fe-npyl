import { ComponentType, CSSProperties, FC, useMemo } from "react";
import { BaseCalendarCellProps, BaseCalendarYearViewProps } from "../types";
import { EmptyCell } from "./Empty";

const getCell =
    (Cell: ComponentType<BaseCalendarCellProps>) => (monthDate: Date) => (
        <Cell key={monthDate.toISOString()} date={monthDate} />
    );

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

    const months = useMemo(
        () => Array.from({ length: 12 }, (_, i) => new Date(year, i, 1)),
        [year]
    );

    return <div style={gridStyle}>{months.map(getCell(Cell))}</div>;
};

export default YearView;
