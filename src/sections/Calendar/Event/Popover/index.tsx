import getBorderColor from "@/theme/borderColor";
import { forwardRef, ReactNode, useCallback, useImperativeHandle } from "react";
import usePopoverPosition from "./usePopperControl";
import { Paper, Popper, PopperProps, SxProps, Theme } from "@mui/material";
import { Z_INDEX } from "@/constants/calendar";
import { State } from "@popperjs/core";

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
    zIndex: Z_INDEX.HEADER + 1,
};

interface EventPopperRef {
    show: VoidFunction;
    hide: VoidFunction;
    updatePosition: () => Promise<Partial<State> | undefined>;
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

        const updatePosition = useCallback(async () => {
            const res = await actionsRef.current?.update();
            if (!res) return;
            return res;
        }, []);
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
                anchorEl={anchorEl}
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
