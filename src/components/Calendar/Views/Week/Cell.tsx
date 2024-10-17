import { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { WEEKDAYS } from "@/components/BaseCalendar/constants";
import { HEADER_HEIGHT } from "./constant";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import CalendarEvent from "../../Event";

// -------------------------------------------------------------------------

const getEvent = (ce: TCalendarEvent) => (
    <CalendarEvent key={ce.id} event={ce} />
);

// -------------------------------------------------------------------------

interface DayTypographyProps {
    date: Date;
}

const DayTypography: FC<DayTypographyProps> = ({ date }) => {
    const day = date.toLocaleDateString("en-US", {
        day: "2-digit",
    });

    const isToday = date.toDateString() === new Date().toDateString();
    const bgColor = isToday ? "primary.main" : "transparent";
    const color = isToday ? "background.paper" : "text.secondary";

    return (
        <Typography
            textAlign="center"
            variant="h3"
            width="fit-content"
            borderRadius="100%"
            bgcolor={bgColor}
            color={color}
            px={1.5}
            py={0.5}
        >
            {day}
        </Typography>
    );
};

// -------------------------------------------------------------------------

const CalendarWeekViewCell: FC<CalendarCellProps> = ({ events, date }) => (
    <Stack width={1}>
        <Stack
            height={HEADER_HEIGHT}
            justifyContent="center"
            alignItems="center"
            top="75px"
            // ...
            position="sticky"
            zIndex={3}
            bgcolor="background.default"
        >
            <Typography
                textAlign="center"
                variant="h6"
                width={1}
                color="text.secondary"
            >
                {WEEKDAYS[date.getDay()]}
            </Typography>
            <Stack width={1} justifyContent="center" alignItems="center">
                <DayTypography date={date} />
            </Stack>
        </Stack>
        <Stack position="relative">
            {/* Events */}
            {events.map(getEvent)}
        </Stack>
    </Stack>
);

export default CalendarWeekViewCell;
