import getBorderColor from "@/theme/borderColor";
import {
    forwardRef,
    ReactNode,
    useCallback,
    useImperativeHandle,
    useMemo,
} from "react";
import usePopoverPosition from "./usePopperControl";
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
    show: VoidFunction;
    hide: VoidFunction;
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
        const {
            onPopperRef,
            onPaperRef,
            // ...
            actionsRef,
            show,
            hide,
        } = usePopoverPosition();

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
                show,
                hide,
                updatePosition,
            }),
            []
        );

        return (
            <Popper
                popperRef={onPopperRef}
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
