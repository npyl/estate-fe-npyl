import getBorderColor from "@/theme/borderColor";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        minWidth: "100%",
        maxWidth: "100%",
        height: "80vh",
    },
    [theme.breakpoints.up("sm")]: {
        minWidth: "300px",
        maxWidth: "500px",
        height: "fit-content",
        // ...
        padding: theme.spacing(1),
        boxShadow: theme.shadows[20],
        // ...
        border: "1px solid",
        borderColor: getBorderColor(theme),
    },
}));

export default StyledPaper;
