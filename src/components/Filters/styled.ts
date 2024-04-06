import {
    Box,
    Button,
    ButtonProps,
    ListItem as MuiListItem,
    ListItemProps as MuiListItemProps,
    DialogContent,
    DialogContentProps,
    InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface PriceButtonProps extends ButtonProps {
    open: boolean;
}

export const StyledPriceButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "open",
})<PriceButtonProps>(({ theme, open }) => ({
    backgroundColor: theme.palette.background.paper,
    fontWeight: 400,
    color:
        theme.palette.mode === "dark"
            ? theme.palette.neutral?.[400]
            : theme.palette.text.secondary,
    fontSize: "16px",
    border: open
        ? `2px solid ${theme.palette.primary.main}`
        : `1px solid ${theme.palette.divider}`,

    "&:hover": {
        border: open
            ? `2px solid ${theme.palette.primary.main}`
            : `1px solid ${theme.palette.common.black}`,
        // Look like OutlinedInput
        borderColor:
            theme.palette.mode === "dark"
                ? theme.palette.neutral?.[500]
                : theme.palette.divider[200],
        backgroundColor: "transparent",
    },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
    marginTop: 35,
    border: 0,
    boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`,
    borderRadius: 15,
    background:
        theme.palette.mode === "dark"
            ? theme.palette.neutral?.[900]
            : theme.palette.common.white,
    p: 1,
}));

interface ListItemProps extends MuiListItemProps {
    selected?: boolean;
}

export const ListItem = styled(MuiListItem)<ListItemProps>(
    ({ theme, selected }) => ({
        cursor: "pointer",
        borderRadius: "10px",
        "&:hover": {
            backgroundColor:
                theme.palette.mode === "light"
                    ? theme.palette.neutral?.[200]
                    : theme.palette.neutral?.[800],
        },

        ...(selected
            ? {
                  backgroundColor:
                      theme.palette.mode === "light"
                          ? theme.palette.neutral?.[200]
                          : theme.palette.neutral?.[800],
              }
            : {}),
    })
);

export const StyledDialogContent = styled(DialogContent, {
    shouldForwardProp: (prop) => prop !== "open",
})<DialogContentProps>({
    maxHeight: "none",
    overflow: "visible",
});

export const StyledInputLabel = styled(InputLabel)({
    textAlign: "center",
});
