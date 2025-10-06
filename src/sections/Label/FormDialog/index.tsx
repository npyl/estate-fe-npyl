import Dialog from "@/components/Dialog";
import { FC } from "react";
import {
    DialogActions,
    DialogActionsProps,
    DialogContent,
    DialogContentProps,
} from "@mui/material";
import Title from "./Title";
import { ILabel } from "@/types/label";
import FormWithCancel from "./FormWithCancel";

const StyledContent: FC<DialogContentProps> = ({ sx, ...props }) => (
    <DialogContent sx={{ p: 1, ...sx }} {...props} />
);

const StyledActions: FC<DialogActionsProps> = ({ sx, ...props }) => (
    <DialogActions sx={{ p: 0, ...sx }} {...props} />
);

interface FormDialogProps {
    label?: ILabel;
}

const FormDialog: FC<FormDialogProps> = ({ label }) => (
    <Dialog
        DialogContentComponent={StyledContent}
        DialogActionsComponent={StyledActions}
        title={<Title labelId={label?.id} />}
        content={<FormWithCancel label={label} />}
    />
);

export default FormDialog;
