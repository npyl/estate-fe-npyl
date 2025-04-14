import getBorderColor from "@/theme/borderColor";
import {
    forwardRef,
    ReactNode,
    useCallback,
    useImperativeHandle,
    useMemo,
} from "react";
import usePopoverPosition from "./usePopoverPosition";
import { Paper, Popper, PopperProps, SxProps, Theme } from "@mui/material";
import { Z_INDEX } from "@/constants/config";
import { VirtualElement } from "@popperjs/core";

const PaperSx: SxProps<Theme> = {
    minWidth: "300px",
    maxWidth: "500px",
    height: "fit-content",
    p: 1,
    boxShadow: 20,
    borderColor: getBorderColor,
};

const PopperSx: SxProps<Theme> = {
    m: 1,
    zIndex: Z_INDEX.POPOVER,
};

interface EventPopperRef {
    updatePosition: VoidFunction;
}

interface EventPopperProps
    extends Omit<
        PopperProps,
        | "action"
        | "anchorOrigin"
        | "transformOrigin"
        | "slotProps"
        | "children"
        | "onClose"
    > {
    children: ReactNode;
}

const EventPopper = forwardRef<EventPopperRef, EventPopperProps>(
    ({ children, sx, anchorEl, ...props }, ref) => {
        const { actionsRef, onPaperRef } = usePopoverPosition();

        const virtualAnchorEl = useMemo<VirtualElement | null>(() => {
            if (!anchorEl) return null;
            if (typeof anchorEl !== "object") return null;
            if (!("getBoundingClientRect" in anchorEl)) return null;

            const position = anchorEl.getBoundingClientRect();

            return {
                getBoundingClientRect: () => position,
            };
        }, [anchorEl]);

        const updatePosition = useCallback(
            () => actionsRef.current?.update(),
            []
        );
        useImperativeHandle(
            ref,
            () => ({
                updatePosition,
            }),
            []
        );

        return (
            <Popper
                popperRef={actionsRef}
                placement="right"
                anchorEl={virtualAnchorEl}
                sx={{ ...PopperSx, ...sx }}
                {...props}
            >
                <Paper ref={onPaperRef} sx={PaperSx} variant="outlined">
                    {children}
                </Paper>
            </Popper>
        );
    }
);

export type { EventPopperRef };
export default EventPopper;
