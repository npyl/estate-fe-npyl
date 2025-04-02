import { forwardRef, MouseEvent } from "react";
import { Stack, StackProps, SxProps, Theme } from "@mui/material";
import useResponsiveCellPositions from "./useResponsiveCellPositions";
import useDraggable from "./useDraggable";
import { TCalendarEvent } from "../../types";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import { Z_INDEX } from "@/constants/calendar";

// -------------------------------------------------------------------------------------

const StackSx: SxProps<Theme> = {
    position: "absolute",
    cursor: "grab",
    transition: "transform 0.2s ease",

    "&:active": {
        cursor: "grabbing",
        zIndex: Z_INDEX.HEADER,
    },
};

const stopPropagation = (e: MouseEvent) => e.stopPropagation();

interface DraggableStackProps extends Omit<StackProps, "onDragEnd"> {
    event: TCalendarEvent;
    onDragEnd?: (e: TCalendarEvent, startDate: string, endDate: string) => void;
}

const DraggableStack = forwardRef<HTMLDivElement, DraggableStackProps>(
    ({ event, sx, onClick, onDragEnd, ...props }, ref) => {
        const elementRef = useForwardedLocalRef<HTMLDivElement>(ref as any);

        const { cellsRef } = useResponsiveCellPositions();

        const { onMouseDown } = useDraggable(
            event,
            // ...
            elementRef,
            cellsRef,
            // ...
            onDragEnd
        );

        // If no drag handling needed, return simple Stack
        if (!onDragEnd) return <Stack ref={elementRef} sx={sx} {...props} />;

        return (
            <Stack
                ref={elementRef}
                sx={{ ...StackSx, ...sx }}
                onMouseDown={onMouseDown}
                onClick={onClick}
                {...props}
            />
        );
    }
);

export type { DraggableStackProps };
export default DraggableStack;
