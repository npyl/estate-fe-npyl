import getBorderColor from "@/theme/borderColor";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/material/styles";

const StyledActions = styled(DialogActions)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
    },
    gap: theme.spacing(1),
    borderTop: "1px solid",
    borderTopColor: getBorderColor(theme),
}));

export { StyledActions };
