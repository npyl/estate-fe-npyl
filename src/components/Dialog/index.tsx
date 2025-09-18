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
import ResponsiveDialog from "./ResponsiveDialog";

type DialogProps = {
    submit?: boolean; // support <form> mode
    hideTitle?: boolean;

    title?: ReactNode;
    content?: ReactNode;
    actions?: ReactNode;

    DialogTitleComponent?: ComponentType<DialogTitleProps>;
    DialogContentComponent?: ComponentType<DialogContentProps>;
    DialogActionsComponent?: ComponentType<DialogActionsProps>;

    onClose?: VoidFunction;
} & Omit<MuiDialogProps, "title" | "content" | "onClose">;

const Dialog: FC<DialogProps> = ({
    submit = false,
    hideTitle = false,

    title,
    actions,
    content,

    DialogTitleComponent = DialogTitle,
    DialogContentComponent = DialogContent,
    DialogActionsComponent = DialogActions,

    ...props
}) => {
    if (!props.open) return null;

    return (
        <ResponsiveDialog
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
        </ResponsiveDialog>
    );
};

export type { DialogProps };
export default Dialog;
