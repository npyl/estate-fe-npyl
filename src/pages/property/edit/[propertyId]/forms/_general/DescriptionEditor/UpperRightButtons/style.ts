import { SxProps, Theme } from "@mui/material";
import { PopoverProps as MuiPopoverProps } from "@mui/material/Popover";

const HideText: SxProps<Theme> = {
    "& .MuiButton-startIcon": {
        mr: { xs: 0, sm: 1 },
    },
    fontSize: { xs: 0, sm: "initial" },
};

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

export { HideText, PopoverProps };
