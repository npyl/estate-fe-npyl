import getBorderColor from "@/theme/borderColor";
import { FC, ReactNode } from "react";
import usePopoverPosition from "./usePopoverPosition";
import { Paper, Popper, PopperProps, SxProps, Theme } from "@mui/material";
import { Z_INDEX } from "@/constants/config";

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

const EventPopover: FC<EventPopperProps> = ({ children, sx, ...props }) => {
    const { actionsRef, onPaperRef } = usePopoverPosition();

    return (
        <Popper
            popperRef={actionsRef}
            placement="right"
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
