import { forwardRef, useCallback } from "react";
import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { TCalendarEvent } from "../types";
import { DAY_CELL_HEIGHT, START_HOUR, Z_INDEX } from "@/constants/calendar";
import dynamic from "next/dynamic";
import Duration from "./_shared/Duration";
import Title from "./_shared/Title";
import { EventProps } from "./types";
import getTypeColor from "./_shared/getTypeColor";
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

// left-factor
const LF = 10;

const getEventSx = (overlapCount?: number): SxProps<Theme> => {
    const c = overlapCount ?? 0;

    const marginLeft = 1 + c * LF;
    const width = ({ spacing }: Theme) => `calc(100% - ${spacing(2 + c * LF)})`;
    const zIndex = Z_INDEX.EVENT + c;

    return {
        backgroundColor: ({ palette }) => palette.background.paper,
        borderRadius: "10px",
        boxShadow: 10,

        marginLeft,
        width,

        position: "absolute",
        zIndex,

        transition: "all 0.3s ease",

        cursor: "pointer",

        "&:hover": {
            boxShadow: 20,
        },
    };
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
    ({ event, overlapCount, onClick, ...props }, ref) => {
        const { top, height } = calculateEventPosition(event);

        console.log("overlayCount: ", overlapCount);

        const maxHeight = Math.max(height, DAY_CELL_HEIGHT);
        const isMinimumHeight = maxHeight === DAY_CELL_HEIGHT;

        const handleClick = useCallback(() => onClick?.(event), [onClick]);

        return (
            <Stack
                ref={ref}
                sx={getEventSx(overlapCount)}
                top={top}
                height={maxHeight}
                onClick={handleClick}
                {...props}
            >
                <Title
                    title={event.title}
                    mini={isMinimumHeight}
                    color={getTypeColor(event.type)}
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
