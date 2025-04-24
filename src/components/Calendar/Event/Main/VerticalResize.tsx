import { useRef, useCallback, MutableRefObject, FC } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { CellPosition } from "./types";
import updateDurationLabelAsync from "./updateDuration";
import stopPropagation from "@/utils/stopPropagation";
import {
    TCalendarEvent,
    TOnEventResizeEnd,
    TOnEventResizeStart,
} from "../../types";

const ResizeHandleSx: SxProps<Theme> = {
    position: "absolute",
    bottom: -5,

    width: "100%",
    height: "10px",
    cursor: "ns-resize",
    backgroundColor: "transparent",
    zIndex: 10,
};

interface VerticalResizeProps {
    targetRef: MutableRefObject<HTMLDivElement | null>;
    cellsRef: MutableRefObject<CellPosition[]>;
    event: TCalendarEvent;
    onResizeStart?: TOnEventResizeStart;
    onResizeEnd?: TOnEventResizeEnd;
}

const VerticalResize: FC<VerticalResizeProps> = ({
    targetRef,
    cellsRef,
    event,
    onResizeStart,
    onResizeEnd,
}) => {
    const isResizing = useRef(false);

    const startYRef = useRef(0);
    const startHeightRef = useRef(0);

    // INFO: if after 300ms we are still resizing (a.k.a. it wasn't a click) fire the onResizeStart event
    const evaluateResizeStart = useCallback(() => {
        if (!isResizing.current) return;
        onResizeStart?.();
    }, [onResizeStart]);

    const handleResizeStart = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();

            if (!targetRef.current) return;

            isResizing.current = true;

            startYRef.current = e.clientY;
            startHeightRef.current = targetRef.current.offsetHeight;

            document.addEventListener("mousemove", handleResizeMove);
            document.addEventListener("mouseup", handleResizeEnd);

            setTimeout(evaluateResizeStart, 300);
        },
        [targetRef, evaluateResizeStart]
    );

    const handleResizeMove = useCallback(
        (e: MouseEvent) => {
            e.stopPropagation();

            if (!isResizing.current || !targetRef.current) return;

            const deltaY = e.clientY - startYRef.current;
            const newHeight = startHeightRef.current + deltaY;

            // Simply set the new height without constraints
            targetRef.current.style.height = `${newHeight}px`;

            // Update duration
            updateDurationLabelAsync(targetRef.current, cellsRef);
        },
        [targetRef]
    );

    const handleResizeEnd = useCallback(
        (e: MouseEvent) => {
            e.stopPropagation();

            isResizing.current = false;

            document.removeEventListener("mousemove", handleResizeMove);
            document.removeEventListener("mouseup", handleResizeEnd);

            if (!onResizeEnd || !targetRef.current) return;

            onResizeEnd(event, targetRef.current.offsetHeight);
        },
        [event, onResizeEnd]
    );

    return (
        <Box
            sx={ResizeHandleSx}
            onMouseDown={handleResizeStart}
            // ...
            onClick={stopPropagation}
        />
    );
};

VerticalResize.displayName = "VerticalResize";

export type { VerticalResizeProps };
export default VerticalResize;
