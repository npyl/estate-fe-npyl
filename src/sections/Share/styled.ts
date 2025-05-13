import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import getBorderColor from "@/theme/borderColor";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    width: "280px",
    maxWidth: "90vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    gap: theme.spacing(2),
    border: "1px solid",
    borderColor: getBorderColor(theme),

    "& .PPShareButton:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

export { StyledPaper };
