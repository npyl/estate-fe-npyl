import React from "react";
import { Box, Typography } from "@mui/material";
import { TCalendarEvent } from "./Views/types";
import { DAY_CELL_HEIGHT, START_HOUR } from "./Views/constant";

const calculateEventPosition = (event: TCalendarEvent) => {
    const startHour = event.startDate.getHours();
    const startMinutes = event.startDate.getMinutes();
    const endHour = event.endDate.getHours();
    const endMinutes = event.endDate.getMinutes();

    const top = (startHour - START_HOUR + startMinutes / 60) * DAY_CELL_HEIGHT;
    const height =
        (endHour - startHour + (endMinutes - startMinutes) / 60) *
        DAY_CELL_HEIGHT;

    return {
        top,
        height,
    };
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
            right={0}
            top={top}
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
