import Dialog from "@/components/Dialog";
import { FC } from "react";
import {
    DialogActions,
    DialogActionsProps,
    DialogContent,
    DialogContentProps,
} from "@mui/material";
import Title from "./Title";
import Form, { LabelFormProps } from "@/ui/Label/Form";

const StyledContent: FC<DialogContentProps> = ({ sx, ...props }) => (
    <DialogContent sx={{ p: 1, ...sx }} {...props} />
);

const StyledActions: FC<DialogActionsProps> = ({ sx, ...props }) => (
    <DialogActions sx={{ p: 0, ...sx }} {...props} />
);

interface FormDialogProps extends Omit<LabelFormProps, "onSuccess"> {}

const FormDialog: FC<FormDialogProps> = (props) => (
    <Dialog
        DialogContentComponent={StyledContent}
        DialogActionsComponent={StyledActions}
        title={<Title labelId={props?.label?.id} />}
        content={<Form {...props} onSuccess={props.onCancel} />}
    />
);

export type { FormDialogProps };
export default FormDialog;
