import { FC, forwardRef, MouseEvent, useCallback, useState } from "react";
import {
    Box,
    Stack,
    SxProps,
    Theme,
    Typography,
    TypographyProps,
} from "@mui/material";
import { DAY_CELL_HEIGHT, Z_INDEX } from "@/constants/calendar";
import dynamic from "next/dynamic";
import Title from "./_shared/Title";
import { EventProps } from "./types";
import { LF } from "./_constants";
import useWidthObserver from "@/hooks/useWidthObserver";
import DraggableStack from "./DraggableStack";
import calculateTimePosition from "@/components/Calendar/calculateTimePosition";
import Description from "./_shared/Description";
const Bullet = dynamic(() => import("./Bullet"));
const People = dynamic(() => import("./_shared/People"));

// ------------------------------------------------------------------------------------

const getEventSx = (overlapCount?: number): SxProps<Theme> => {
    const c = overlapCount ?? 0;

    const marginLeft = 1 + c * LF;
    const width = ({ spacing }: Theme) => `calc(100% - ${spacing(2 + c * LF)})`;
    const zIndex = Z_INDEX.EVENT + c;

    return {
        backgroundColor: ({ palette }) => palette.background.paper,
        borderRadius: 1,
        boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.4)",

        marginLeft,
        width,

        position: "absolute",
        zIndex,

        transition: "all 0.3s ease",

        cursor: "pointer",

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

        const maxHeight = Math.max(height, DAY_CELL_HEIGHT);
        const isMinimumHeight = maxHeight === DAY_CELL_HEIGHT;

        const [isBullet, setBullet] = useState(false);

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
            <DraggableStack
                ref={onRef}
                sx={getEventSx(overlapCount)}
                overlapCount={overlapCount}
                top={top}
                height={maxHeight}
                event={event}
                onClick={handleClick}
                {...props}
            >
                <Title
                    title={event.title}
                    startDate={event.startDate}
                    endDate={event.startDate}
                    type={event.type}
                    colorId={event.colorId}
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
            </DraggableStack>
        );
    }
);

export default CalendarEvent;
