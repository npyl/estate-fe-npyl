import { Button } from "@mui/material";
import { alpha, styled } from "@mui/system";

export const SoftButton = styled(Button)(({ theme, color = "primary" }) => ({
    color: theme.palette[color].main,
    backgroundColor: alpha(theme.palette[color].main, 0.16),
    "&:hover": {
        backgroundColor: alpha(theme.palette[color].main, 0.32),
    },
}));
