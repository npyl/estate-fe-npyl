import { forwardRef, ReactNode, useCallback, useImperativeHandle } from "react";
import usePopoverPosition from "./usePopperControl";
import { Popper as MuiPopper, SxProps, Theme } from "@mui/material";
import { Z_INDEX } from "@/constants/calendar";
import { State } from "@popperjs/core";
import { getPopoverTestId } from "./constants";
import WithResponsive, { PopperProps } from "./WithResponsive";
import StyledPaper from "./StyledPaper";

const Popper = WithResponsive(MuiPopper);

// ------------------------------------------------------------------------

const PopperSx: SxProps<Theme> = {
    m: 1,
    zIndex: {
        xs: ({ zIndex }) => zIndex.modal + 10000,
        sm: Z_INDEX.HEADER + 1,
    },
};

interface EventPopperRef {
    show: VoidFunction;
    hide: VoidFunction;
    updatePosition: () => Promise<Partial<State> | undefined>;
}

interface EventPopperProps extends Omit<PopperProps, "placement" | "children"> {
    eventId: string;
    children: ReactNode;
}

const EventPopover = forwardRef<EventPopperRef, EventPopperProps>(
    ({ eventId, children, sx, ...props }, ref) => {
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
                data-testid={getPopoverTestId(eventId)}
                popperRef={onPopperRef}
                placement="right"
                sx={{ ...PopperSx, ...sx }}
                {...props}
            >
                <StyledPaper ref={onPaperRef}>{children}</StyledPaper>
            </Popper>
        );
    }
);

export type { EventPopperRef };
export default EventPopover;
