import { Popper, PopperProps, Stack, StackProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material";
import { bgBlur } from "src/utils/cssStyles";
import { SearchCategory } from "./dashboard-navbar-search/types";

interface StyledPopperProps extends PopperProps {
    searchCategory: SearchCategory;
}

export const StyledPopper = styled((props: StyledPopperProps) => (
    <Popper {...props} />
))<StyledPopperProps>(({ theme, searchCategory }) => ({
    position: "relative",
    top: "10px !important",
    boxShadow: theme.shadows[20],
    width: "40vw",
    zIndex: 99999,
    left: searchCategory === "all" ? "-90px !important" : "-70px !important",

    [theme.breakpoints.down("sm")]: {
        width: "65vw",
        left:
            searchCategory === "all" ? "-90px !important" : "-90px !important",
    },

    [theme.breakpoints.up("md")]: {
        top: "10px",
    },

    [theme.breakpoints.up("lg")]: {
        left: searchCategory === "all" ? "-170px !important" : "0px !important",
    },

    "& .MuiAutocomplete-paper": {
        padding: theme.spacing(1, 0),
    },
    "& .MuiListSubheader-root": {
        "&.MuiAutocomplete-groupLabel": {
            ...bgBlur({ color: theme.palette.neutral?.[400] }),
            ...theme.typography.overline,
            top: 0,
            margin: 0,
            lineHeight: "48px",
        },
    },

    "& .MuiAutocomplete-listbox": {
        "& .MuiAutocomplete-option": {
            padding: theme.spacing(0.5, 2),
            margin: 0,
            display: "block",
            border: `dashed 1px transparent`,
            borderBottomColor: theme.palette.divider,
            "&:last-of-type": {
                borderBottomColor: "transparent",
            },
            "&:hover": {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.hoverOpacity
                ),
            },
        },
    },
}));

export const StyledSearchStack = styled((props: StackProps) => (
    <Stack {...props} />
))(({ theme }) => ({
    margin: 0,

    border: `dashed 1px transparent`,
    borderBottomColor: theme.palette.divider,
    "&:last-of-type": {
        borderBottomColor: "transparent",
    },
    "&:hover": {
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.hoverOpacity
        ),
    },
}));
