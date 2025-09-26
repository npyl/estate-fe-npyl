import getBorderColor from "@/theme/borderColor";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),

    [theme.breakpoints.up("sm")]: {
        minWidth: "300px",
        maxWidth: "500px",
        // ...
        boxShadow: theme.shadows[20],
        // ...
        border: "1px solid",
        borderColor: getBorderColor(theme),
    },
}));

export default StyledPaper;
