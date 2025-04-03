import { forwardRef, MouseEvent, useCallback, useState } from "react";
import { Box, Stack, SxProps, Theme } from "@mui/material";
import { DAY_CELL_HEIGHT, Z_INDEX } from "@/constants/calendar";
import dynamic from "next/dynamic";
import Title from "./_shared/Title";
import { EventProps } from "./types";
import { LF } from "./_constants";
import useWidthObserver from "@/hooks/useWidthObserver";
import calculateTimePosition from "@/components/Calendar/calculateTimePosition";
import Description from "./_shared/Description";
import { useCalendarColorById } from "@/services/calendar";
import ColoredContainer from "./ColoredContainer";
const Bullet = dynamic(() => import("./Bullet"));
const People = dynamic(() => import("./_shared/People"));

// ------------------------------------------------------------------------------------

const getEventSx = (overlapCount?: number): SxProps<Theme> => {
    const c = overlapCount ?? 0;

    const marginLeft = 1 + c * LF;
    const width = ({ spacing }: Theme) => `calc(100% - ${spacing(2 + c * LF)})`;
    const zIndex = Z_INDEX.EVENT + c;

    return {
        backgroundColor: "background.paper",
        borderRadius: 1,
        boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.4)",

        marginLeft,
        width,

        position: "absolute",
        zIndex,

        transition: "all 0.3s ease",

        // IMPORTANT: prevent text selection because it causes loss of dragging flow
        userSelect: "none",

        cursor: "pointer",

        // INFO: prevent editor from overflowing
        overflowY: "hidden",

        "&:hover": {
            zIndex: Z_INDEX.HEADER - 1,
            boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.55)",
        },
    };
};

const CalendarEvent = forwardRef<HTMLDivElement, EventProps>(
    ({ event, overlapCount = 0, onClick, ...props }, ref) => {
        const { top, height } = calculateTimePosition(
            event.startDate,
            event.endDate
        );

        const bgcolor = useCalendarColorById(event?.colorId);

        const maxHeight = Math.max(height, DAY_CELL_HEIGHT);
        const isMinimumHeight = maxHeight === DAY_CELL_HEIGHT;

        const [isBullet, setBullet] = useState(false);

        const handleClick = useCallback(
            (e: MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                onClick?.(event, e);
            },
            [onClick, event]
        );

        const handleWidth = useCallback(
            (width: number) => setBullet(width <= 60),
            []
        );

        const { onRef } = useWidthObserver(ref, handleWidth);

        if (isBullet) {
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
            <ColoredContainer
                ref={onRef}
                bgcolor={bgcolor}
                sx={getEventSx(overlapCount)}
                top={top}
                height={maxHeight}
                event={event}
                onClick={handleClick}
                {...props}
            >
                <Title
                    title={event.title}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    type={event.type}
                />

                {!isMinimumHeight ? (
                    <>
                        <Description content={event.description} />

                        <Box flexGrow={1} />

                        {event.type !== "TASK" ? (
                            <Stack p={1}>
                                <People p={event.people} />
                            </Stack>
                        ) : null}
                    </>
                ) : null}
            </ColoredContainer>
        );
    }
);

export default CalendarEvent;
