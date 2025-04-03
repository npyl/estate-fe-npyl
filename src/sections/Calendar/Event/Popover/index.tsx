import getBorderColor from "@/theme/borderColor";
import { FC, ReactNode } from "react";
import usePopoverPosition from "./usePopoverPosition";
import {
    ClickAwayListener,
    Paper,
    Popper,
    PopperProps,
    SxProps,
    Theme,
} from "@mui/material";
import { Z_INDEX } from "@/constants/config";

const PaperSx: SxProps<Theme> = {
    minWidth: "300px",
    maxWidth: "500px",
    height: "fit-content",
    p: 1,
    boxShadow: 20,
    borderColor: getBorderColor,
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
    onClose: VoidFunction;
}

const EventPopover: FC<EventPopperProps> = ({
    children,
    sx,
    onClose,
    ...props
}) => {
    const { actionsRef, onPaperRef } = usePopoverPosition();

    return (
        <ClickAwayListener onClickAway={onClose}>
            <Popper
                popperRef={actionsRef}
                placement="right"
                sx={{
                    m: 1,
                    zIndex: Z_INDEX.POPOVER,
                    ...sx,
                }}
                {...props}
            >
                <Paper ref={onPaperRef} sx={PaperSx} variant="outlined">
                    {children}
                </Paper>
            </Popper>
        </ClickAwayListener>
    );
};

export default EventPopover;
