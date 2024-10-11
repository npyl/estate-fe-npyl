import React from "react";
import { Box, Typography } from "@mui/material";
import { TCalendarEvent } from "./Views/types";
import { DAY_CELL_HEIGHT } from "./Views/constant";

const calculateEventPosition = (event: TCalendarEvent) => {
    const startHour = event.startDate.getHours();
    const startMinute = event.startDate.getMinutes();
    const endHour = event.endDate.getHours();
    const endMinute = event.endDate.getMinutes();

    const top = startHour * DAY_CELL_HEIGHT + startMinute;
    const height = endHour * DAY_CELL_HEIGHT + endMinute - top;

    return { top, height };
};

interface CalendarEventProps {
    event: TCalendarEvent;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {
    const { top, height } = calculateEventPosition(event);

    return (
        <Box
            position="absolute"
            left={50}
            top={top}
            right={0}
            height={height}
            bgcolor="primary.light"
            borderRadius={1}
            p={1}
            overflow="hidden"
        >
            <Typography variant="subtitle2" noWrap>
                {event.title}
            </Typography>
            {event.location && (
                <Typography variant="caption" color="text.secondary" noWrap>
                    {event.location}
                </Typography>
            )}
        </Box>
    );
};

export default CalendarEvent;
