import { Box, styled } from "@mui/material";

interface ScrollBoxProps {
    scrollbarWidth?: string;
}

export const ScrollBox = styled(Box)<ScrollBoxProps>(
    ({ theme, scrollbarWidth }) => ({
        maxHeight: "90vh",
        padding: "5px 5px", // padding to the top and bottom

        overflow: "auto",
        "&::-webkit-scrollbar": {
            height: "5px",
            width: scrollbarWidth,
        },
        "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 5px grey",
            borderRadius: "12px",
        },
        "&::-webkit-scrollbar-thumb": {
            background: theme.palette.grey[500],
            borderRadius: "100px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            background: theme.palette.grey[700],
        },

        // For Firefox
        scrollbarWidth: "thin", // You can also set this to "none" to hide the scrollbar completely
    })
);
