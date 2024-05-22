import { IconButton, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface ViewModeButtonProps extends IconButtonProps {
    selected: boolean;
}

export const ViewModeButton = styled(IconButton)<ViewModeButtonProps>(
    ({ theme, selected }) => ({
        height: "38px",
        width: "38px",
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderWidth: selected ? "2px" : "1px",

        color: selected
            ? theme.palette.primary.main
            : theme.palette.mode === "light"
            ? theme.palette.neutral?.[400]
            : theme.palette.neutral?.[500],

        borderColor: selected
            ? theme.palette.primary.main
            : theme.palette.mode === "light"
            ? theme.palette.neutral?.[300]
            : theme.palette.neutral?.[700],

        "&:hover": {
            backgroundColor: "transparent", // required

            borderColor: selected
                ? theme.palette.primary.main
                : theme.palette.mode === "light"
                ? theme.palette.neutral?.[400]
                : theme.palette.neutral?.[500],

            ".MuiSvgIcon-root": {
                color: selected
                    ? theme.palette.primary.main
                    : theme.palette.mode === "light"
                    ? theme.palette.neutral?.[400]
                    : theme.palette.neutral?.[400],
            },
        },
    })
);
