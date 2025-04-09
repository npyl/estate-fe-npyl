import { forwardRef, MouseEvent } from "react";
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

interface MainProps extends Omit<EventContainerProps, "bgcolor"> {
    event: TCalendarEvent;
    isMinimumHeight: boolean;

    onEventClick?: TOnEventClick;
    onEventDragEnd?: TOnEventDragEnd;
    onEventResizeEnd?: TOnEventResizeEnd;
}

const Main = forwardRef<HTMLDivElement, MainProps>(
    (
        { event, isMinimumHeight, onEventResizeEnd, onEventDragEnd, ...props },
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

        // if (!onEventDragEnd) return <Stack onClick={handleClick} {...props} />;

        return (
            <Container
                ref={ref}
                bgcolor={bgcolor}
                onMouseDown={onMouseDown}
                onMouseUp={stopPropagation}
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
