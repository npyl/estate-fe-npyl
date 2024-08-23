import MuiPopover, {
    PopoverProps as MuiPopoverProps,
} from "@mui/material/Popover";
import { FC } from "react";

interface PopoverProps
    extends Omit<MuiPopoverProps, "open" | "anchorOrigin" | "transformOrigin"> {
    row: number;
}

const Popover: FC<PopoverProps> = ({ row, ...props }) => {
    return (
        <MuiPopover
            open
            anchorOrigin={{
                vertical: "center",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "center",
                horizontal: "left",
            }}
            {...props}
        >
            sdsdsdsds
        </MuiPopover>
    );
};

export default Popover;
