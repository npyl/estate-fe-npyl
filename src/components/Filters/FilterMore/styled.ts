import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";

export const StyledDialogContent = styled(DialogContent, {
    shouldForwardProp: (prop) => prop !== "open",
})<DialogContentProps>(({ theme }) => ({
    maxHeight: "none",
    overflowX: "hidden",
    overflowY: "auto",

    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));
