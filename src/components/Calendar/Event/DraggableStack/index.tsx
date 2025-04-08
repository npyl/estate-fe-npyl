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
import DurationUpdateStack from "./DurationUpdateStack";
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
            <DurationUpdateStack
                ref={elementRef}
                cellsRef={cellsRef}
                sx={{ ...StackSx, ...sx }}
                onMouseDown={onMouseDown}
                onClick={handleClick}
                {...props}
            >
                <VerticalResize
                    event={event}
                    cellsRef={cellsRef}
                    targetRef={elementRef}
                    onResizeEnd={onResizeEnd}
                >
                    {children}
                </VerticalResize>
            </DurationUpdateStack>
        );
    }
);

export type { DraggableStackProps };
export default DraggableStack;
