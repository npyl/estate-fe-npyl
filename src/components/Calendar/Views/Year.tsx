import YearView from "@/components/BaseCalendar/View/Year";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
    CalendarCellProps,
    CalendarYearViewProps,
    TCalendarEvent,
} from "../types";
import { _getTodaysEvents } from "./util";

const YearEvent: FC<TCalendarEvent> = ({ title }) => {
    return <>{title}</>;
};

// ------------------------------------------------------------

const getEvent = (e: TCalendarEvent) => <YearEvent key={e.id} {...e} />;

// ------------------------------------------------------------

export const CalendarYearViewCell: FC<CalendarCellProps> = ({
    date,
    events,
}) => (
    <Stack>
        <Typography textAlign="center" variant="h6" color="text.secondary">
            {date.toLocaleString("default", {
                month: "long",
            })}
        </Typography>
        <Stack height="200px">{events.map(getEvent)}</Stack>
    </Stack>
);

// ------------------------------------------------------------

const Year: FC<CalendarYearViewProps> = ({
    events = [],
    Cell: PassedCell,
    date,
    getCellEvents = _getTodaysEvents,
    ...props
}) => {
    const Cell = PassedCell || CalendarYearViewCell;

    return (
        <YearView
            date={date}
            Cell={(props) => (
                <Cell {...props} events={getCellEvents(events, props.date)} />
            )}
            {...props}
        />
    );
};

export default Year;
