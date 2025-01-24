import {
    ForwardedRef,
    forwardRef,
    MouseEvent,
    useImperativeHandle,
    useRef,
} from "react";
import { Stack, StackProps } from "@mui/material";
import useResponsiveCellPositions from "./useResponsiveCellPositions";
import useDraggable from "./useDraggable";
import { TCalendarEvent } from "../../types";

// ------------------------------------------------------------------------------------

/**
 * This hook makes allows us to use a local ref and forward it as the `ref` of forwardRef()
 *
 * @param ref a forwarded ref coming from forwardRef()
 * @param initialValue initial value for local ref object (e.g. usually null)
 * @returns local ref object
 */
const useForwardedLocalRef = <T extends HTMLElement = HTMLElement>(
    ref: ForwardedRef<T>,
    initialValue: T | null = null
) => {
    const localRef = useRef<T>(initialValue);

    useImperativeHandle(ref, () => localRef.current!);

    return localRef;
};

// -------------------------------------------------------------------------------------

const stopPropagation = (e: MouseEvent) => e.stopPropagation();

export interface DraggableStackProps extends Omit<StackProps, "onDragEnd"> {
    event: TCalendarEvent;
    overlapCount: number;
    onDragEnd?: (e: TCalendarEvent, startDate: string, endDate: string) => void;
}

const DraggableStack = forwardRef<HTMLDivElement, DraggableStackProps>(
    ({ event, overlapCount, sx, onClick, onDragEnd, ...props }, ref) => {
        const elementRef = useForwardedLocalRef<HTMLDivElement>(ref);

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

export default DraggableStack;
