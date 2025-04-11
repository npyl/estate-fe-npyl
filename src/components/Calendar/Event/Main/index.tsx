import { forwardRef, MouseEvent, useCallback } from "react";
import { Box, Stack } from "@mui/material";
import Title from "../_shared/Title";
import Description from "../_shared/Description";
import Container, { EventContainerProps } from "../Container";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import dynamic from "next/dynamic";
const People = dynamic(() => import("../_shared/People"));

import { useCalendarColorById } from "@/services/calendar";
import VerticalResize from "./VerticalResize";
import useResponsiveCellPositions from "./useResponsiveCellPositions";
import {
    TCalendarEvent,
    TOnEventClick,
    TOnEventDragEnd,
    TOnEventResizeEnd,
} from "../../types";
import useDraggable from "./useDraggable";
import stopPropagation from "@/utils/stopPropagation";
import useNoDragClick from "../../useNoDragClick";

interface MainProps
    extends Omit<EventContainerProps, "bgcolor" | "onClick" | "onMouseDown"> {
    event: TCalendarEvent;
    isMinimumHeight: boolean;

    onEventClick?: TOnEventClick;
    onEventDragEnd?: TOnEventDragEnd;
    onEventResizeEnd?: TOnEventResizeEnd;
}

const Main = forwardRef<HTMLDivElement, MainProps>(
    (
        {
            event,
            isMinimumHeight,
            onEventClick,
            onEventResizeEnd,
            onEventDragEnd,
            // ...
            onMouseMove,
            ...props
        },
        ref
    ) => {
        const elementRef = useForwardedLocalRef<HTMLDivElement>(ref as any);

        const bgcolor = useCalendarColorById(event?.colorId);

        const { cellsRef } = useResponsiveCellPositions();

        const { onMouseDown } = useDraggable(
            event,
            elementRef,
            cellsRef,
            onEventDragEnd
        );

        const handleClick = useCallback(
            (me: MouseEvent<HTMLDivElement>) => {
                me.stopPropagation();
                onEventClick?.(me, event);
            },
            [onEventClick, event]
        );

        const methods = useNoDragClick(handleClick, onMouseDown, onMouseMove);

        return (
            <Container
                ref={ref}
                bgcolor={bgcolor}
                onMouseUp={stopPropagation}
                {...methods}
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

                <VerticalResize
                    event={event}
                    cellsRef={cellsRef}
                    targetRef={elementRef}
                    onResizeEnd={onEventResizeEnd}
                />
            </Container>
        );
    }
);

export default Main;
