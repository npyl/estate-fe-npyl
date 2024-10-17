import { FC } from "react";
import WeekView from "@/components/BaseCalendar/View/Week";
import Numbering from "../Numbering";
import { styled } from "@mui/material";
import { DAY_CELL_HEIGHT } from "../../constant";
import { CalendarWeekViewProps } from "../../types";
import { _getTodaysEvents } from "../util";
import dynamic from "next/dynamic";
const CalendarWeekViewCell = dynamic(() => import("./Cell"));

// ----------------------------------------------------------------------

const StyledNumbering = styled(Numbering)({
    marginTop: DAY_CELL_HEIGHT,
});

// -----------------------------------------------------------------------

const CalendarWeekView: FC<CalendarWeekViewProps> = ({
    events = [],
    getCellEvents = _getTodaysEvents,
    Cell: PassedCell,
    date,
    ...props
}) => {
    const Cell = PassedCell || CalendarWeekViewCell;

    return (
        <WeekView
            date={date}
            Cell={(props) => (
                <Cell {...props} events={getCellEvents(events, props.date)} />
            )}
            Numbering={StyledNumbering}
            {...props}
        />
    );
};

export default CalendarWeekView;
