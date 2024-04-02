import { DialogContent, DialogContentProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledDialogContent = styled(DialogContent, {
    shouldForwardProp: (prop) => prop !== "open",
})<DialogContentProps>({
    maxHeight: "none",
    overflow: "visible",
});
