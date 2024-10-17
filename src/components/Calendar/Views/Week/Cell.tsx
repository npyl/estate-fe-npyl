import { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { WEEKDAYS } from "@/components/BaseCalendar/constants";
import { DAY_CELL_HEIGHT } from "../../constant";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import CalendarEvent from "../../Event";

const getEvent = (ce: TCalendarEvent) => (
    <CalendarEvent key={ce.id} event={ce} />
);

const CalendarWeekViewCell: FC<CalendarCellProps> = ({ events, date }) => (
    <Stack width={1}>
        <Typography
            textAlign="center"
            variant="h6"
            width={1}
            minHeight={DAY_CELL_HEIGHT}
            color="text.secondary"
        >
            {WEEKDAYS[date.getDay()]}
        </Typography>
        <Stack position="relative">
            {/* Events */}
            {events.map(getEvent)}
        </Stack>
    </Stack>
);

export default CalendarWeekViewCell;
