import React, { forwardRef } from "react";
import { Box, BoxProps, Typography } from "@mui/material";
import { TCalendarEvent } from "../types";
import { DAY_CELL_HEIGHT, START_HOUR } from "../constant";

// ------------------------------------------------------------------------------------

const calculateEventPosition = (event: TCalendarEvent) => {
    const startHour = new Date(event.startDate).getHours();
    const startMinutes = new Date(event.startDate).getMinutes();
    const endHour = new Date(event.endDate).getHours();
    const endMinutes = new Date(event.endDate).getMinutes();

    const top = (startHour - START_HOUR + startMinutes / 60) * DAY_CELL_HEIGHT;
    const height =
        (endHour - startHour + (endMinutes - startMinutes) / 60) *
        DAY_CELL_HEIGHT;

    return {
        top,
        height,
    };
};

// ------------------------------------------------------------------------------------

export interface CalendarEventProps extends Omit<BoxProps, "ref"> {
    event: TCalendarEvent;
}

const CalendarEvent = forwardRef<HTMLDivElement, CalendarEventProps>(
    ({ event, ...props }, ref) => {
        const { top, height } = calculateEventPosition(event);

        return (
            <Box
                ref={ref}
                position="absolute"
                left={50}
                right={0}
                top={top}
                height={height}
                bgcolor={event.type.color}
                p={1}
                mx={1}
                overflow="hidden"
                boxShadow={10}
                {...props}
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
    }
);

export default CalendarEvent;
