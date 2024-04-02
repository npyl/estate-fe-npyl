import { Theme } from "@mui/material";

const getBorderColor = (theme: Theme) =>
    theme.palette.mode === "dark"
        ? theme.palette.neutral?.[600]
        : theme.palette.neutral?.[300];

export const getBorderColor2 = (theme: Theme) =>
    theme.palette.mode === "dark"
        ? theme.palette.neutral?.[700]
        : theme.palette.neutral?.[250];

// Export the most usual
export default getBorderColor;
