import { SxProps, Theme } from "@mui/material";

const HideText: SxProps<Theme> = {
    "& .MuiButton-startIcon": {
        mr: { xs: 0, sm: 1 },
    },
    fontSize: { xs: 0, sm: "initial" },
};

export { HideText };
