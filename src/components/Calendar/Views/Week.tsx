import { CSSProperties, FC } from "react";
import {
    BaseCalendarCellProps,
    BaseCalendarWeekViewProps,
} from "@/components/BaseCalendar/types";
import WeekView from "@/components/BaseCalendar/View/Week";

// ----------------------------------------------------------------------

const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "8px",
};

// ----------------------------------------------------------------------

const Cell: FC<BaseCalendarCellProps> = ({ date }) => {
    return <div>{date.getDate().toString()}</div>;
};

const CalendarWeekView: FC<BaseCalendarWeekViewProps> = ({ date }) => {
    return <WeekView date={date} Cell={Cell} style={gridStyle} />;
};

export default CalendarWeekView;
