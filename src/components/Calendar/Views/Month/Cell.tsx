import { FC } from "react";
import { Stack } from "@mui/material";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import MonthCalendarEvent from "../../Event/Month";

const getEvent =
    (onClick?: (e: TCalendarEvent) => void) => (e: TCalendarEvent) =>
        <MonthCalendarEvent key={e.id} event={e} onClick={onClick} />;

const CalendarMonthViewCell: FC<CalendarCellProps> = ({
    events,
    onEventClick,
}) => (
    <Stack
        height="300px"
        position="relative"
        border="1px solid"
        borderColor="divider"
        borderTop="none"
        borderRight="none"
        sx={{
            "&:nth-of-type(7n)": {
                borderRight: "1px solid",
                borderColor: "divider",
            },
        }}
    >
        {events.map(getEvent(onEventClick))}
    </Stack>
);

export default CalendarMonthViewCell;
