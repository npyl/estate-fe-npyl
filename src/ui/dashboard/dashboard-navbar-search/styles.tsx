import Link from "@/components/Link";
import { alpha } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledSearchStack = styled(Link)(({ theme }) => ({
    margin: 0,

    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "flex-start",

    paddingY: theme.spacing(1),
    paddingX: theme.spacing(2),

    gap: theme.spacing(2),

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
