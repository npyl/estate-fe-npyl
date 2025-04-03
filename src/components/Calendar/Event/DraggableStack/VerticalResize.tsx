import {
    forwardRef,
    useState,
    useRef,
    useCallback,
    MutableRefObject,
} from "react";
import { Stack, StackProps, Box, SxProps, Theme } from "@mui/material";
import { TCalendarEvent, TOnEventResizeEnd } from "../../types";

const ResizeHandleSx: SxProps<Theme> = {
    width: "100%",
    height: "10px",
    cursor: "ns-resize",
    backgroundColor: "transparent",
    zIndex: 10,
};

const ResizableStackSx: SxProps<Theme> = {
    position: "relative",
    overflow: "visible",
};

interface VerticalResizeProps extends Omit<StackProps, "onResize"> {
    targetRef: MutableRefObject<HTMLDivElement | null>;

    event: TCalendarEvent;
    onResizeEnd?: TOnEventResizeEnd;
}

const VerticalResize = forwardRef<HTMLDivElement, VerticalResizeProps>(
    (
        {
            children,
            sx,
            targetRef,
            minHeight = 40,
            maxHeight = "none",
            event,
            onResizeEnd,
            ...props
        },
        ref
    ) => {
        const isResizing = useRef(false);

        const startYRef = useRef(0);
        const startHeightRef = useRef(0);

        const onResizeStart = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();

                if (!targetRef.current) return;

                isResizing.current = true;

                startYRef.current = e.clientY;
                startHeightRef.current = targetRef.current.offsetHeight;

                document.addEventListener("mousemove", handleResizeMove);
                document.addEventListener("mouseup", handleResizeEnd);
            },
            [targetRef]
        );

        const handleResizeMove = useCallback(
            (e: MouseEvent) => {
                e.stopPropagation();

                if (!isResizing.current || !targetRef.current) return;

                const deltaY = e.clientY - startYRef.current;
                const newHeight = startHeightRef.current + deltaY;

                // Apply constraints if minHeight and maxHeight are numbers
                const constrainedHeight =
                    typeof minHeight === "number" && newHeight < minHeight
                        ? minHeight
                        : typeof maxHeight === "number" && newHeight > maxHeight
                        ? maxHeight
                        : newHeight;

                targetRef.current.style.height = `${constrainedHeight}px`;
            },
            [targetRef, minHeight, maxHeight]
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
            <Stack
                ref={ref}
                sx={{
                    ...ResizableStackSx,
                    minHeight,
                    maxHeight,
                    height: "auto",
                    ...sx,
                }}
                {...props}
            >
                {children}

                <Box sx={ResizeHandleSx} onMouseDown={onResizeStart} />
            </Stack>
        );
    }
);

VerticalResize.displayName = "VerticalResize";

export type { VerticalResizeProps };
export default VerticalResize;
