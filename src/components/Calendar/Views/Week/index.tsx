import { FC } from "react";
import WeekView from "@/components/BaseCalendar/View/Week";
import Numbering from "../Numbering";
import { Stack, styled } from "@mui/material";
import { MARGIN_TOP } from "./constant";
import { CalendarWeekViewProps } from "../../types";
import { _getTodaysEvents } from "../util";
import dynamic from "next/dynamic";
import DaysHeader from "./DaysHeader";
const CalendarWeekViewCell = dynamic(() => import("./Cell"));

// ----------------------------------------------------------------------

const StyledNumbering = styled(Numbering)({
    marginTop: MARGIN_TOP,
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
        <Stack spacing={1}>
            <DaysHeader date={date} />

            <WeekView
                date={date}
                Cell={(props) => (
                    <Cell
                        {...props}
                        events={getCellEvents(events, props.date)}
                    />
                )}
                Numbering={StyledNumbering}
                {...props}
            />
        </Stack>
    );
};

export default CalendarWeekView;
