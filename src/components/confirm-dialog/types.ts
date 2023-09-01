// @mui
import { DialogProps } from "@mui/material";

// ----------------------------------------------------------------------

export interface ConfirmDialogProps extends Omit<DialogProps, "content"> {
    title: string;
    content?: React.ReactNode;
    action: React.ReactNode;
    open: boolean;
    onClose: VoidFunction;
}
