import { FC } from "react";
import { Stack } from "@mui/material";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import CompactCalendarEvent from "../../Event/Compact";

const getEvent = (e: TCalendarEvent) => (
    <CompactCalendarEvent key={e.id} event={e} />
);

const CalendarMonthViewCell: FC<CalendarCellProps> = ({ events }) => (
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
        {events.map(getEvent)}
    </Stack>
);

export default CalendarMonthViewCell;
