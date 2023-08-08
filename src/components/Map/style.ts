import { Button, Stack, Typography } from "@mui/material";
import { darken } from "@mui/material/styles";
import { styled } from "@mui/system";

export const StyledButton = styled(Button)(({ theme }) => ({
    alignSelf: "center",
    display: ["none", "none", "none", "none", "inline-flex"],
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(0.25),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    borderColor: theme.palette.grey[300],
    color: theme.palette.grey[700],

    "&:hover": {
        borderColor: theme.palette.grey[400],
        backgroundColor: darken(theme.palette.common.white, 0.1), // Darkens the white color by 10%
    },
    [theme.breakpoints.up("xl")]: {
        display: "inline-flex",
        backgroundColor: theme.palette.common.black,
        borderColor: theme.palette.grey[700],
        color: theme.palette.grey[300],
        "&:hover": {
            backgroundColor: darken(theme.palette.common.black, 0.1), // Darkens the black color by 10%
        },
    },
    "&:focus": {
        outline: "none",
    },
    "&:focus-visible": {
        ringWidth: "2px",
        ringColor: theme.palette.common.white,
        ringOpacity: 0.75,
    },
}));
