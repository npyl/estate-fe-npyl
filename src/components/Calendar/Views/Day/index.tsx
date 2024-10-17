import { CSSProperties, FC } from "react";
import { CalendarDayViewProps } from "../../types";
import dynamic from "next/dynamic";
import DayView from "@/components/BaseCalendar/View/Day";
import Numbering from "../Numbering";
import { _getTodaysEvents } from "../util";
const CalendarDayViewCell = dynamic(() => import("./Cell"));

const ViewStyle: CSSProperties = {
    position: "relative",
};

const CalendarDayView: FC<CalendarDayViewProps> = ({
    style,
    events = [],
    Cell: PassedCell,
    getCellEvents = _getTodaysEvents,
    ...props
}) => {
    const Cell = PassedCell || CalendarDayViewCell;

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
