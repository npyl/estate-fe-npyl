import { forwardRef, useCallback } from "react";
import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { TCalendarEvent } from "../types";
import { DAY_CELL_HEIGHT, START_HOUR, Z_INDEX } from "@/constants/calendar";
import dynamic from "next/dynamic";
import Duration from "./_shared/Duration";
import Title from "./_shared/Title";
import { EventProps } from "./types";
const Members = dynamic(() => import("./_shared/Members"));

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

const EventSx: SxProps<Theme> = {
    backgroundColor: ({ palette }) => palette.background.paper,
    borderRadius: "10px",
    boxShadow: 10,

    marginLeft: 1,
    width: (theme) => `calc(100% - ${theme.spacing(2)})`,

    position: "absolute",
    zIndex: Z_INDEX.EVENT,

    transition: "all 0.3s ease",

    cursor: "pointer",

    "&:hover": {
        boxShadow: 20,
    },
};

const DescriptionSx: SxProps<Theme> = {
    px: 1,
    height: "100%",
    bgcolor: (theme) =>
        theme.palette.mode === "light"
            ? theme.palette.neutral?.[200]
            : theme.palette.neutral?.[700],
    borderRadius: "5px",
};

const CalendarEvent = forwardRef<HTMLDivElement, EventProps>(
    ({ event, onClick, ...props }, ref) => {
        const { top, height } = calculateEventPosition(event);

        const maxHeight = Math.max(height, DAY_CELL_HEIGHT);
        const isMinimumHeight = maxHeight === DAY_CELL_HEIGHT;

        const handleClick = useCallback(() => onClick?.(event), [onClick]);

        return (
            <Stack
                ref={ref}
                sx={EventSx}
                top={top}
                height={maxHeight}
                onClick={handleClick}
                {...props}
            >
                <Title
                    title={event.title}
                    mini={isMinimumHeight}
                    color={event.type.color}
                    startDate={event.startDate}
                    endDate={event.endDate}
                />

                {!isMinimumHeight ? (
                    <>
                        <Stack p={1} spacing={1}>
                            <Duration
                                start={event.startDate}
                                end={event.endDate}
                                width={1}
                            />

                            <Typography
                                variant="subtitle2"
                                noWrap
                                sx={DescriptionSx}
                            >
                                {event.description}
                            </Typography>
                        </Stack>

                        <Box flexGrow={1} />

                        <Stack p={1}>
                            <Members ids={[1, 2, 3, 4, 5]} />
                        </Stack>
                    </>
                ) : null}
            </Stack>
        );
    }
);

export default CalendarEvent;
