import { forwardRef } from "react";
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

interface DraggableStackProps extends Omit<StackProps, "onDragEnd"> {
    event: TCalendarEvent;
    onDragEnd?: TOnEventDragEnd;
    onResizeEnd?: TOnEventResizeEnd;
}

const DraggableStack = forwardRef<HTMLDivElement, DraggableStackProps>(
    (
        { event, sx, onClick, onDragEnd, onResizeEnd, children, ...props },
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

        // If no drag handling needed, return simple Stack
        if (!onDragEnd) return <Stack ref={elementRef} sx={sx} {...props} />;

        return (
            <DurationUpdateStack
                ref={elementRef}
                cellsRef={cellsRef}
                sx={{ ...StackSx, ...sx }}
                onMouseDown={onMouseDown}
                onClick={onClick}
                {...props}
            >
                <VerticalResize
                    event={event}
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
