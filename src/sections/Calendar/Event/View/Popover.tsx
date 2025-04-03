import getBorderColor from "@/theme/borderColor";
import Popover, { PopoverProps } from "@mui/material/Popover";
import { FC, ForwardedRef } from "react";

interface EventPopoverProps
    extends Omit<
        PopoverProps,
        "anchorOrigin" | "transformOrigin" | "slotProps"
    > {
    paperRef?: ForwardedRef<HTMLDivElement>;
}

const EventPopover: FC<EventPopoverProps> = ({ paperRef, ...props }) => (
    <Popover
        anchorOrigin={{ horizontal: "right", vertical: "center" }}
        transformOrigin={{ horizontal: "left", vertical: "center" }}
        slotProps={{
            paper: {
                sx: {
                    minWidth: "300px",
                    maxWidth: "500px",
                    height: "fit-content",
                    p: 1,
                    boxShadow: 20,
                    borderColor: getBorderColor,
                },
                variant: "outlined",
                ref: paperRef,
            },
            root: {
                sx: {
                    ml: 0.5,
                },
            },
        }}
        {...props}
    />
);

export default EventPopover;
