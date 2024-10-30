import { CSSProperties, FC } from "react";
import WeekView from "@/components/BaseCalendar/View/Week";
const DefaultNumbering = dynamic(() => import("../Numbering"));
import { Stack } from "@mui/material";
import { CalendarWeekViewProps } from "../../types";
import { _getTodaysEvents } from "../util";
import dynamic from "next/dynamic";
import DaysHeader from "./DaysHeader";
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
                Cell={(props) => (
                    <Cell
                        {...props}
                        events={getCellEvents(events, props.date)}
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
