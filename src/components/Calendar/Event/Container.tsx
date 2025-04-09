import { forwardRef, MouseEvent } from "react";
import { Stack, SxProps, Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import stopPropagation from "@/utils/stopPropagation";
import { EventProps } from "./types";
import { LF } from "./_constants";
import { Z_INDEX } from "@/constants/calendar";

const getEventSx = (overlapCount?: number): SxProps<Theme> => {
    const c = overlapCount ?? 0;

    const marginLeft = 1 + c * LF;
    const width = ({ spacing }: Theme) => `calc(100% - ${spacing(2 + c * LF)})`;
    const zIndex = Z_INDEX.EVENT + c;

    return {
        backgroundColor: "background.paper",
        borderRadius: 1,
        boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.4)",

        marginLeft,
        width,

        position: "absolute",
        zIndex,

        transition: "all 0.3s ease",

        // IMPORTANT: prevent text selection because it causes loss of dragging flow
        userSelect: "none",

        // INFO: prevent editor from overflowing
        overflowY: "hidden",

        cursor: "grab",

        // Prevent text selection during drag
        "&:active": {
            cursor: "grabbing",
        },

        "&:hover": {
            zIndex: Z_INDEX.HEADER - 1,
            boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.55)",
        },
    };
};

interface EventContainerProps
    extends Omit<
        EventProps,
        | "bgcolor"
        | "event"
        | "onEventClick"
        | "onEventDragEnd"
        | "onEventResizeEnd"
    > {
    bgcolor: string;

    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    onMouseUp?: (e: MouseEvent<HTMLDivElement>) => void;
    onMouseDown?: (e: MouseEvent<HTMLDivElement>) => void;
}

const EventContainer = forwardRef<HTMLDivElement, EventContainerProps>(
    ({ bgcolor, overlapCount, sx, children, ...props }, ref) => (
        <Stack
            ref={ref}
            height={1}
            borderRadius={1}
            // ...
            sx={{ ...(getEventSx(overlapCount) as any), ...sx }}
            {...props}
        >
            <Stack bgcolor={alpha(bgcolor, 0.4)} height={1}>
                {children}
            </Stack>
        </Stack>
    )
);

EventContainer.displayName = "EventContainer";

export type { EventContainerProps };
export default EventContainer;
