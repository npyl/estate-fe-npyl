import {
    forwardRef,
    useRef,
    useCallback,
    MutableRefObject,
    PropsWithChildren,
    FC,
} from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { TCalendarEvent, TOnEventResizeEnd } from "../../types";

const ResizeHandleSx: SxProps<Theme> = {
    width: "100%",
    height: "10px",
    cursor: "ns-resize",
    backgroundColor: "transparent",
    zIndex: 10,
};

interface VerticalResizeProps extends PropsWithChildren {
    targetRef: MutableRefObject<HTMLDivElement | null>;
    event: TCalendarEvent;
    onResizeEnd?: TOnEventResizeEnd;
}

const VerticalResize: FC<VerticalResizeProps> = ({
    targetRef,
    event,
    onResizeEnd,
    children,
}) => {
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

            // Simply set the new height without constraints
            targetRef.current.style.height = `${newHeight}px`;
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
        <>
            {children}
            <Box sx={ResizeHandleSx} onMouseDown={onResizeStart} />
        </>
    );
};

VerticalResize.displayName = "VerticalResize";

export type { VerticalResizeProps };
export default VerticalResize;
