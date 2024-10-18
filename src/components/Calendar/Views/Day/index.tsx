import { CSSProperties, FC } from "react";
import { CalendarDayViewProps } from "../../types";
import dynamic from "next/dynamic";
import DayView from "@/components/BaseCalendar/View/Day";
import { _getTodaysEvents } from "../util";
const DefaultNumbering = dynamic(() => import("../Numbering"));
const CalendarDayViewCell = dynamic(() => import("./Cell"));

const ViewStyle: CSSProperties = {
    position: "relative",
};

const CalendarDayView: FC<CalendarDayViewProps> = ({
    style,
    events = [],
    Cell: PassedCell,
    Numbering: PassedNumbering,
    getCellEvents = _getTodaysEvents,
    ...props
}) => {
    const Cell = PassedCell || CalendarDayViewCell;
    const Numbering = PassedNumbering || DefaultNumbering;

    return (
        <DayView
            style={{ ...ViewStyle, ...style }}
            Cell={(props) => (
                <Cell {...props} events={getCellEvents(events, props.date)} />
            )}
            Numbering={Numbering}
            {...props}
        />
    );
};

export default CalendarDayView;
