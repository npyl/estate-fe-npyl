import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledGrid = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(1),

    borderRadius: "25px",

    backgroundColor:
        theme.palette.mode === "light"
            ? "#F7F8F9"
            : theme.palette.background.default,

    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    minHeight: 100, // NOTE: a minimum height helps a dropped card not fall on the column name glitch
    width: "100%",

    // ...

    ".Controls": {
        visibility: "hidden",
    },

    "&:hover .Controls": {
        visibility: "visible",
    },
}));

export { StyledGrid };
