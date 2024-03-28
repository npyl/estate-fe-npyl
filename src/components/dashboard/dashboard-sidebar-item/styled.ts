import type { ButtonProps } from "@mui/material";
import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";

interface LeafButtonProps extends ButtonProps {
    active?: boolean;
}

export const Button = styled(MuiButton)<LeafButtonProps>(
    ({ theme, active }) => ({
        width: "100%",
        textDecoration: "none",
        borderRadius: theme.shape.borderRadius,
        color:
            theme.palette.mode === "light"
                ? theme.palette.neutral?.[700]
                : theme.palette.neutral?.[200],
        justifyContent: "flex-start",
        textAlign: "left",
        textTransform: "none",
        ...(active && {
            backgroundColor:
                theme.palette.mode === "light"
                    ? theme.palette.neutral?.[100]
                    : theme.palette.neutral?.[800],
            color: theme.palette.secondary.main,
            fontWeight: theme.typography.fontWeightBold,
        }),
        "& .MuiButton-startIcon": {
            color: active
                ? theme.palette.secondary.main
                : theme.palette.neutral?.[400],
        },
        "&:hover": {
            backgroundColor:
                theme.palette.mode === "light"
                    ? theme.palette.neutral?.[100]
                    : theme.palette.neutral?.[800],
        },
    })
);
