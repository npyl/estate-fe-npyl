import { forwardRef, MouseEvent } from "react";
import { Stack, StackProps } from "@mui/material";
import useResponsiveCellPositions from "./useResponsiveCellPositions";
import useDraggable from "./useDraggable";
import { TCalendarEvent } from "../../types";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";

// -------------------------------------------------------------------------------------

const stopPropagation = (e: MouseEvent) => e.stopPropagation();

interface DraggableStackProps extends Omit<StackProps, "onDragEnd"> {
    event: TCalendarEvent;
    overlapCount: number;
    onDragEnd?: (e: TCalendarEvent, startDate: string, endDate: string) => void;
}

const DraggableStack = forwardRef<HTMLDivElement, DraggableStackProps>(
    ({ event, overlapCount, sx, onClick, onDragEnd, ...props }, ref) => {
        const elementRef = useForwardedLocalRef<HTMLDivElement>(ref as any);

        const { cellsRef } = useResponsiveCellPositions();

        const { onMouseDown, onMouseMove, onMouseUp } = useDraggable(
            event,
            overlapCount,
            // ...
            elementRef,
            cellsRef,
            // ...
            onClick,
            onDragEnd
        );

        // If no drag handling needed, return simple Stack
        if (!onDragEnd) return <Stack ref={elementRef} sx={sx} {...props} />;

        return (
            <Stack
                ref={elementRef}
                sx={{
                    position: "absolute",
                    cursor: "grab",
                    transition: "transform 0.2s ease",
                    ...sx,
                }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onClick={stopPropagation}
                {...props}
            />
        );
    }
);

export type { DraggableStackProps };
export default DraggableStack;
