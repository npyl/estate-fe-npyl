import React, { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { TCalendarEvent } from "./types";
import { DAY_CELL_HEIGHT, START_HOUR } from "./Views/constant";

// ------------------------------------------------------------------------------------

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

// ------------------------------------------------------------------------------------

interface CalendarEventProps {
    event: TCalendarEvent;
    onLoad?: (top: number) => void;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ event, onLoad }) => {
    const { top, height } = calculateEventPosition(event);

    // onLoad() support on mount; null happens on unmount
    const handleRef = useCallback((node: HTMLDivElement | null) => {
        if (!node) return;
        onLoad?.(node.offsetTop);
    }, []);

    return (
        <Box
            ref={handleRef}
            position="absolute"
            left={50}
            right={0}
            top={top}
            height={height}
            bgcolor={event.type.color}
            p={1}
            mr={1}
            overflow="hidden"
            boxShadow={10}
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
