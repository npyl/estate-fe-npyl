import { PopoverProps as MuiPopoverProps } from "@mui/material/Popover";

const PopoverProps: Omit<MuiPopoverProps, "open"> = {
    anchorOrigin: {
        horizontal: "left",
        vertical: "bottom",
    },
    transformOrigin: {
        horizontal: "right",
        vertical: "top",
    },
};

export { PopoverProps };
