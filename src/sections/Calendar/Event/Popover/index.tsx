import getBorderColor from "@/theme/borderColor";
import { FC, ReactNode, useMemo } from "react";
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

const EventPopover: FC<EventPopperProps> = ({
    children,
    sx,
    anchorEl,
    ...props
}) => {
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
};

export default EventPopover;
