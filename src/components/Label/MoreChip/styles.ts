// mui
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
// custom
import getBorderColor, { getBorderColor2 } from "@/theme/borderColor";

const StyledChip = styled(Chip)(({ theme }) => ({
    paddingTop: theme.spacing(0.4),
    paddingBottom: theme.spacing(0.4),

    backgroundColor: `${getBorderColor(theme)} !important`,
    "&:hover": {
        backgroundColor: `${theme.palette.action.focus} !important`,
    },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    width: "300px",

    border: "1px solid",
    borderColor: getBorderColor2(theme),
    backgroundColor:
        theme.palette.mode === "dark"
            ? theme.palette.neutral?.[800]
            : theme.palette.background.paper,
}));

export default StyledChip;
