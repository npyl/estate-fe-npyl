import { styled } from "@mui/material/styles";
import { DialogTitle } from "@mui/material";
import getBorderColor from "@/theme/borderColor";

export const StyledTitle = styled(DialogTitle)(({ theme }) => ({
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // ....
    backgroundColor: theme.palette.background.paper,
    borderBottom: "1px solid",
    borderColor: getBorderColor(theme),
    boxSizing: "border-box",
    padding: theme.spacing(1),
    // ...
    top: 0,
    zIndex: 2,
    minWidth: "95vw",
}));
