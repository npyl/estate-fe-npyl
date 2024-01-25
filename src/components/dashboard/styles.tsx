import { Popper, PopperProps, Stack, StackProps } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/system";
import { bgBlur } from "src/utils/cssStyles";

export const SearchInput = styled(InputBase)(({ theme }) => ({
    borderRadius: 24,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    "&:hover": {
        borderColor: theme.palette.primary.main,
    },
    "&:focus": {
        borderColor: theme.palette.primary.main,
    },
    width: "40vw",
    height: "50px",
    [theme.breakpoints.down("sm")]: {
        width: "65vw",
    },
}));

export const StyledPopper = styled((props: PopperProps) => (
    <Popper {...props} />
))<PopperProps>(({ theme }) => ({
    position: `relative`,
    top: `10px !important`,
    boxShadow: theme.shadows[20],
    width: "40vw",
    left: "-17px !important",

    zIndex: 99999,
    [theme.breakpoints.down("sm")]: {
        width: "65vw",
    },

    [theme.breakpoints.up("md")]: {
        top: "10px",
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
