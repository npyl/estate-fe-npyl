import { forwardRef, MouseEvent, useCallback, useState } from "react";
import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { TCalendarEvent } from "../types";
import { DAY_CELL_HEIGHT, START_HOUR, Z_INDEX } from "@/constants/calendar";
import dynamic from "next/dynamic";
import Duration from "./_shared/Duration";
import Title from "./_shared/Title";
import { EventProps } from "./types";
import getTypeColor from "./_shared/getTypeColor";
import { LF } from "./_constants";
import useWidthObserver from "@/hooks/useWidthObserver";
import DraggableStack from "./DraggableStack";
const Bullet = dynamic(() => import("./Bullet"));
const People = dynamic(() => import("./_shared/People"));

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
            zIndex: Z_INDEX.HEADER - 1,
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
    ({ event, overlapCount = 0, onClick, ...props }, ref) => {
        const { top, height } = calculateEventPosition(event);

        const maxHeight = Math.max(height, DAY_CELL_HEIGHT);
        const isMinimumHeight = maxHeight === DAY_CELL_HEIGHT;

        const [isCompact, setCompact] = useState(false);

        const handleClick = useCallback(
            (e: MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();

                onClick?.({
                    ...e,
                    currentTarget: { ...e.currentTarget, event },
                });
            },
            [onClick, event]
        );

        const handleWidth = useCallback(
            (width: number) => setCompact(width <= 60),
            []
        );

        const { onRef } = useWidthObserver(ref, handleWidth);

        if (isCompact) {
            return (
                <Bullet
                    top={top}
                    title={event?.title}
                    type={event?.type}
                    onClick={handleClick}
                />
            );
        }

        return (
            <DraggableStack
                ref={onRef}
                sx={getEventSx(overlapCount)}
                top={top}
                height={maxHeight}
                event={event}
                onClick={handleClick}
                {...props}
            >
                <Title title={event.title} color={getTypeColor(event.type)} />

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

                        {event.type !== "TASK" ? (
                            <Stack p={1}>
                                <People p={event.people} />
                            </Stack>
                        ) : null}
                    </>
                ) : null}
            </DraggableStack>
        );
    }
);

export default CalendarEvent;
