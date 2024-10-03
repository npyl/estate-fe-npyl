import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export const SpaceBetween = styled(Stack)({
    flexDirection: "row",
    justifyContent: "space-between",
});

interface PPButtonProps extends ButtonProps {
    clicked?: boolean;
}

export const PPButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "clicked",
})<PPButtonProps>(({ theme, clicked }) => ({
    backgroundColor: theme.palette.background.paper,
    fontWeight: 400,
    color:
        theme.palette.mode === "dark"
            ? theme.palette.neutral?.[400]
            : theme.palette.text.secondary,
    fontSize: "16px",
    border: clicked
        ? `2px solid ${theme.palette.primary.main}`
        : `1px solid ${theme.palette.divider}`,

    "&:hover": {
        border: clicked
            ? `2px solid ${theme.palette.primary.main}`
            : `1px solid ${theme.palette.common.black}`,
        // Look like OutlinedInput
        borderColor:
            theme.palette.mode === "dark"
                ? theme.palette.neutral?.[500]
                : theme.palette.divider[200],
        backgroundColor: "transparent",
    },

    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",

    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
}));
