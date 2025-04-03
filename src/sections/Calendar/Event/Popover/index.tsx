import getBorderColor from "@/theme/borderColor";
import Popover, { PopoverProps } from "@mui/material/Popover";
import { FC } from "react";
import usePopoverPosition from "./usePopoverPosition";

interface EventPopoverProps
    extends Omit<
        PopoverProps,
        "action" | "anchorOrigin" | "transformOrigin" | "slotProps"
    > {}

const EventPopover: FC<EventPopoverProps> = (props) => {
    const { actionsRef, onPaperRef } = usePopoverPosition();

    return (
        <Popover
            action={actionsRef}
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
                    ref: onPaperRef,
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
};

export default EventPopover;
