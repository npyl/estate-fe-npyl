import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),

    borderRadius: "25px",

    backgroundColor:
        theme.palette.mode === "light"
            ? "#F7F8F9"
            : theme.palette.background.default,

    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    height: "100vh",
    width: "100%",

    // ...

    ".Controls": {
        visibility: "hidden",
    },

    "&:hover .Controls": {
        visibility: "visible",
    },
}));

export { StyledPaper };
