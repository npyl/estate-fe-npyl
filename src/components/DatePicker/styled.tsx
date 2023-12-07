import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const CalendarBox = styled(Box, {
    shouldForwardProp: (props) => props !== "isSingleDate",
})<{ isSingleDate?: boolean }>(({ theme, isSingleDate }) => ({
    padding: "14px 14px",
    borderRadius: "12px",
    background: theme.palette.background.paper,
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    "& .rmdp-range": {
        background: theme.palette.grey,
        boxShadow: "none",
    },
    "& .rmdp-range span": {
        "&:first-of-type": {
            background: isSingleDate
                ? theme.palette.primary.light
                : theme.palette.grey,
            color: isSingleDate ? theme.palette.grey : "inherit",
        },
    },
    "& .rmdp-range-hover": {
        background: theme.palette.grey,
        boxShadow: "none",
    },
    "& .rmdp-day": {
        color: theme.palette.primary.main,
    },
    "& .rmdp-week-day": {
        color: theme.palette.primary.main,
    },
    "& .rmdp-day span": {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
    "& .rmdp-header-values": {
        color: theme.palette.primary.main,
        fontSize: "18px",
    },
    "& .rmdp-range.start": {
        color: "white",
        background: theme.palette.grey,
        borderBottomLeftRadius: "50%",
        borderTopLeftRadius: "50%",
    },
    "& .rmdp-range.start span": {
        background: theme.palette.primary.light,
    },
    "& .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover": {
        background: theme.palette.primary.light,
        color: "white",
    },
    "& .rmdp-range.end": {
        color: "white",
        background: theme.palette.grey,
        borderBottomRightRadius: "50%",
        borderTopRightRadius: "50%",
    },
    "& .rmdp-range.end span": {
        background: theme.palette.primary.light,
    },
    "& .rmdp-range-hover.start": {
        color: "black",
        borderBottomLeftRadius: "50%",
        borderTopLeftRadius: "50%",
    },
    "& .rmdp-day.rmdp-deactive, & .rmdp-day.rmdp-disabled": {
        color: "#8798ad!important",
    },
    "& .rmdp-wrapper": {
        textAlign: "center",
        width: "100%",
    },
    "& .rmdp-shadow": {
        boxShadow: "none",
    },
}));
