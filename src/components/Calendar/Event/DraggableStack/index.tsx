import { forwardRef, MouseEvent, useCallback } from "react";
import { Stack, StackProps, SxProps, Theme } from "@mui/material";
import useResponsiveCellPositions from "./useResponsiveCellPositions";
import useDraggable from "./useDraggable";
import {
    TCalendarEvent,
    TOnEventDragEnd,
    TOnEventResizeEnd,
} from "../../types";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import DurationUpdater from "./DurationUpdater";
import VerticalResize from "./VerticalResize";

// -------------------------------------------------------------------------------------

const StackSx: SxProps<Theme> = {
    position: "absolute",
    cursor: "grab",

    userSelect: "none",

    // Prevent text selection during drag
    "&:active": {
        cursor: "grabbing",
    },
};

// ------------------------------------------------------------------------------

interface DraggableStackProps
    extends Omit<StackProps, "onClick" | "onDragEnd"> {
    event: TCalendarEvent;

    /**
     * @param isReal used to differenciate between propagated or "real" onClick events
     */
    onClick?: (e: MouseEvent<HTMLDivElement>, isReal: boolean) => void;

    onDragEnd?: TOnEventDragEnd;
    onResizeEnd?: TOnEventResizeEnd;
}

const DraggableStack = forwardRef<HTMLDivElement, DraggableStackProps>(
    (
        { event, sx, onDragEnd, onResizeEnd, onClick, children, ...props },
        ref
    ) => {
        const elementRef = useForwardedLocalRef<HTMLDivElement>(ref as any);

        const { cellsRef } = useResponsiveCellPositions();

        const { onMouseDown } = useDraggable(
            event,
            elementRef,
            cellsRef,
            onDragEnd
        );

        const handleClick = useCallback(
            (e: MouseEvent<HTMLDivElement>) => onClick?.(e, true),
            [onClick]
        );

        // If no drag handling needed, return simple Stack
        if (!onDragEnd)
            return (
                <Stack
                    ref={elementRef}
                    sx={sx}
                    onClick={handleClick}
                    {...props}
                />
            );

        return (
            <Stack
                ref={elementRef}
                sx={{ ...StackSx, ...sx }}
                onMouseDown={onMouseDown}
                onClick={handleClick}
                {...props}
            >
                <DurationUpdater elementRef={elementRef} cellsRef={cellsRef} />

                <VerticalResize
                    event={event}
                    cellsRef={cellsRef}
                    targetRef={elementRef}
                    onResizeEnd={onResizeEnd}
                >
                    {children}
                </VerticalResize>
            </Stack>
        );
    }
);

export type { DraggableStackProps };
export default DraggableStack;
