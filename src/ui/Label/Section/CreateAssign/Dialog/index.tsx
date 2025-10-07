import Dialog from "@/components/Dialog";
import Content, { ContentProps } from "./Content";
import { FC } from "react";
import {
    DialogActions,
    DialogActionsProps,
    DialogContent,
    DialogContentProps,
} from "@mui/material";
import CloseButton from "./CloseButton";

const StyledContent: FC<DialogContentProps> = ({ sx, ...props }) => (
    <DialogContent sx={{ p: 0, ...sx }} {...props} />
);
const StyledActions: FC<DialogActionsProps> = ({ sx, ...props }) => (
    <DialogActions
        sx={{ backgroundColor: "background.neutral", ...sx }}
        {...props}
    />
);

interface AddLabelDialog extends ContentProps {
    onClose: VoidFunction;
}

const AddLabelDialog: FC<AddLabelDialog> = ({ onClose, ...props }) => (
    <Dialog
        onClose={onClose}
        DialogContentComponent={StyledContent}
        DialogActionsComponent={StyledActions}
        // ...
        submit
        // ...
        hideTitle
        content={<Content {...props} />}
        actions={<CloseButton onClick={onClose} />}
    />
);

export default AddLabelDialog;
