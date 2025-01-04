import { forwardRef, MouseEvent, useRef } from "react";
import { Stack, StackProps } from "@mui/material";
import useResponsiveCellPositions from "./useResponsiveCellPositions";
import useDraggable from "./useDraggable";

const stopPropagation = (e: MouseEvent) => e.stopPropagation();

export interface DraggableStackProps extends Omit<StackProps, "onDragEnd"> {
    onDragEnd?: (startDate: string) => void;
}

const DraggableStack = forwardRef<HTMLDivElement, DraggableStackProps>(
    ({ sx, onClick, onDragEnd, ...props }, ref) => {
        const elementRef = useRef<HTMLDivElement>(null);

        const { cellsRef } = useResponsiveCellPositions();

        const { onMouseDown, onMouseMove, onMouseUp } = useDraggable(
            elementRef,
            cellsRef,
            onClick,
            onDragEnd
        );

        // If no drag handling needed, return simple Stack
        if (!onDragEnd) return <Stack ref={ref} sx={sx} {...props} />;

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

export default DraggableStack;
