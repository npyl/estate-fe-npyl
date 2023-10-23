import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Stack, { StackProps } from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export const CheckboxList = styled(List, {
    shouldForwardProp: (props) => props !== "horizontalOptions",
})<{ horizontalOptions?: boolean }>(({ theme, horizontalOptions }) => ({
    minWidth: 200,
    maxHeight: 270,
    overflowY: "auto",
    scrollbarWidth: "thin",
    ...(horizontalOptions
        ? {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
              maxWidth: 420,
              minWidth: 420,
          }
        : undefined),
    "& .MuiListItemButton-root": {
        "&:hover": {
            background: theme.palette.primary.main,
        },
    },
}));

export const StyledDateStack = styled((props) => (
    <Stack direction={"row"} spacing={1} {...props} />
))<StackProps>(({ theme }) => ({
    alignItems: "center",
    background: theme.palette.primary.main,
    padding: "4px 8px",
    borderRadius: "6px",
}));

export const CalendarBox = styled(Box, {
    shouldForwardProp: (props) => props !== "isSingleDate",
})<{ isSingleDate?: boolean }>(({ theme, isSingleDate }) => ({
    padding: "14px 14px",
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
