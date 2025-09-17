import {
    Stack,
    Dialog as MuiDialog,
    DialogActions,
    DialogProps as MuiDialogProps,
    DialogContent,
    DialogTitle,
    DialogActionsProps,
    DialogContentProps,
    DialogTitleProps,
} from "@mui/material";
import { ComponentType, FC, ReactNode } from "react";
import DialogForm from "./Form";

type DialogProps = {
    title?: ReactNode;
    content?: ReactNode;
    actions?: ReactNode;

    submit?: boolean; // support <form> mode
    hideTitle?: boolean;

    DialogTitleComponent?: ComponentType<DialogTitleProps>;
    DialogContentComponent?: ComponentType<DialogContentProps>;
    DialogActionsComponent?: ComponentType<DialogActionsProps>;

    onClose?: () => void;
} & Omit<MuiDialogProps, "title" | "content">;

const Dialog: FC<DialogProps> = ({
    open,
    submit = false,
    title,
    actions,
    content,

    hideTitle = false,

    DialogTitleComponent = DialogTitle,
    DialogContentComponent = DialogContent,
    DialogActionsComponent = DialogActions,

    onClose,

    ...props
}) => {
    if (!open) return null;

    return (
        <MuiDialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            // INFO: make the dialog work as a <form> component
            component={submit ? DialogForm : undefined}
            // ...
            {...props}
        >
            {!hideTitle ? (
                <DialogTitleComponent>
                    <Stack alignItems="center" mt={1}>
                        {title}
                    </Stack>
                </DialogTitleComponent>
            ) : null}
            <DialogContentComponent>{content}</DialogContentComponent>
            <DialogActionsComponent>{actions}</DialogActionsComponent>
        </MuiDialog>
    );
};

export type { DialogProps };
export default Dialog;
