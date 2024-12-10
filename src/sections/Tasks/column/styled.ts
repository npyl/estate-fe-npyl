import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: "20px",
    borderTop: 0,

    backgroundColor:
        theme.palette.mode === "light"
            ? "#F7F8F9"
            : theme.palette.background.default,

    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    minHeight: 213,
    height: "fit-content",
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
