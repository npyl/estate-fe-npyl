import {
    Stack,
    Dialog as MuiDialog,
    DialogActions,
    DialogProps as MuiDialogProps,
    DialogContent,
    DialogTitle,
    IconButton as MuiIconButton,
    DialogActionsProps,
    DialogContentProps,
    DialogTitleProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactNode, forwardRef } from "react";
import Iconify from "@/components/iconify";

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    position: "absolute",
    right: theme.spacing(2),
}));

const DialogForm = forwardRef<HTMLFormElement>((props, ref) => (
    <form ref={ref} {...props} method="POST" />
));

DialogForm.displayName = "DialogForm";

export type DialogProps = {
    title?: ReactNode;
    content?: ReactNode;
    actions?: ReactNode;
    submit?: boolean; // support <form> mode

    hideTitle?: boolean;

    DialogTitleComponent?: React.ComponentType<DialogTitleProps>;
    DialogContentComponent?: React.ComponentType<DialogContentProps>;
    DialogActionsComponent?: React.ComponentType<DialogActionsProps>;

    onClose?: () => void;
} & Omit<MuiDialogProps, "title" | "content">;

const Dialog = ({
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
}: DialogProps) =>
    !open ? null : (
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
                    {onClose ? (
                        <IconButton onClick={onClose}>
                            <Iconify icon="line-md:close" />
                        </IconButton>
                    ) : null}
                    <Stack alignItems="center" mt={1}>
                        {title}
                    </Stack>
                </DialogTitleComponent>
            ) : null}
            <DialogContentComponent>{content}</DialogContentComponent>
            <DialogActionsComponent>{actions}</DialogActionsComponent>
        </MuiDialog>
    );

export default Dialog;
