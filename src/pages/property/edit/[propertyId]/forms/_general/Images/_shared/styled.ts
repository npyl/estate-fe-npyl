import { SxProps } from "@mui/material";
import { Theme } from "@mui/material";

const WrapperSx: SxProps<Theme> = {
    backgroundColor: (theme) =>
        theme.palette.mode === "light" ? "neutral.200" : "neutral.800",
};

export { WrapperSx };
