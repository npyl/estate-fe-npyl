import { getBorderColor2 } from "@/theme/borderColor";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/material/styles";
import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    borderBottom: "1px solid",
    borderBottomColor: getBorderColor2(theme),
}));

const StyledDialogContent = styled(DialogContent, {
    shouldForwardProp: (prop) => prop !== "open",
})<DialogContentProps>(({ theme }) => ({
    maxHeight: "none",
    overflowX: "hidden",
    overflowY: "auto",

    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    borderTop: "1px solid",
    borderTopColor: getBorderColor2(theme),
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.neutral?.[200]
            : theme.palette.neutral?.[800],

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
}));

export { StyledDialogTitle, StyledDialogContent, StyledDialogActions };
