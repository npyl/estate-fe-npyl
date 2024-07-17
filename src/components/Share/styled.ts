import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import getBorderColor from "@/theme/borderColor";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    width: "280px",
    maxWidth: "90vw",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1.5),
    alignItems: "flex-start",
    position: "relative",
    borderRadius: "15px",
    boxShadow: theme.shadows[3],
    border: "1px solid",
    borderColor: getBorderColor(theme),
    backgroundColor: theme.palette.background.paper,
}));

export { StyledPaper };
