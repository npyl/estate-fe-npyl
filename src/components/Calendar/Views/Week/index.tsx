import { CSSProperties, FC } from "react";
import WeekView from "@/components/BaseCalendar/View/Week";
const DefaultNumbering = dynamic(() => import("../Numbering"));
import { Stack, styled } from "@mui/material";
import { MARGIN_TOP } from "./constant";
import { CalendarWeekViewProps } from "../../types";
import { _getTodaysEvents } from "../util";
import dynamic from "next/dynamic";
import DaysHeader from "./DaysHeader";
const CalendarWeekViewCell = dynamic(() => import("./Cell"));

// ----------------------------------------------------------------------

const StyledNumbering = styled(DefaultNumbering)({
    marginTop: MARGIN_TOP,
});

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
    onEventEdit,
    onEventDelete,
    // ...
    style,
    ...props
}) => {
    const Cell = PassedCell || CalendarWeekViewCell;
    const Numbering = PassedNumbering || StyledNumbering;

    return (
        <Stack spacing={1}>
            <DaysHeader date={date} />

            <WeekView
                date={date}
                Cell={(props) => (
                    <Cell
                        {...props}
                        events={getCellEvents(events, props.date)}
                        onEventEdit={onEventEdit}
                        onEventDelete={onEventDelete}
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
