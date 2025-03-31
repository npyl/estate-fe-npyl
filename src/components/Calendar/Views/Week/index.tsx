import { CSSProperties, FC } from "react";
import WeekView from "@/components/BaseCalendar/View/Week";
import { Stack } from "@mui/material";
import { CalendarWeekViewProps } from "../../types";
import { _getMiscCellEvents, _getTodaysEvents } from "../util";
import dynamic from "next/dynamic";
import DaysHeader from "./DaysHeader";
const DefaultNumbering = dynamic(() => import("../Numbering"));
const CalendarWeekViewCell = dynamic(() => import("./Cell"));

// -----------------------------------------------------------------------

const ViewStyle: CSSProperties = {
    position: "relative", // INFO: for Numbering
};

const CalendarWeekView: FC<CalendarWeekViewProps> = ({
    date,
    events = [],
    Cell: PassedCell,
    Numbering: PassedNumbering,
    // ...
    getCellEvents = _getTodaysEvents,
    getMiscCellEvents = _getMiscCellEvents,
    onEventClick,
    // ...
    style,
    ...props
}) => {
    const Cell = PassedCell || CalendarWeekViewCell;
    const Numbering = PassedNumbering || DefaultNumbering;

    return (
        <Stack spacing={2}>
            <DaysHeader date={date} />

            <WeekView
                date={date}
                Cell={(other) => (
                    <Cell
                        {...other}
                        events={getCellEvents(events, other.date)}
                        getMiscCellEvents={getMiscCellEvents}
                        onEventClick={onEventClick}
                    />
                )}
                Numbering={Numbering}
                style={{ ...ViewStyle, ...style }}
                {...props}
            />
        </Stack>
    );
};

export default CalendarWeekView;
