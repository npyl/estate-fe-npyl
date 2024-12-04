import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),

    borderRadius: "25px",
    borderStyle: "1px solid",
    borderColor: "divider",
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

export { StyledPaper };
