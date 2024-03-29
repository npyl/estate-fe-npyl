import getBorderColor from "@/theme/borderColor";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

const StyledChip = styled(Chip)(({ theme }) => ({
    width: "min-content",
    height: "min-content",
    paddingTop: theme.spacing(0.4),
    paddingBottom: theme.spacing(0.4),

    backgroundColor: `${getBorderColor(theme)} !important`,
    "&:hover": {
        backgroundColor: `${theme.palette.action.focus} !important`,
    },
}));

export default StyledChip;
