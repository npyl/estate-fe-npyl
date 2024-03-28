import { Theme } from "@mui/material";

const getBorderColor = (theme: Theme) =>
    theme.palette.mode === "dark"
        ? theme.palette.neutral?.[600]
        : theme.palette.neutral?.[300];

export default getBorderColor;
