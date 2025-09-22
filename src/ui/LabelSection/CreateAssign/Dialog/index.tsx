import { ILabel, LabelResourceType } from "@/types/label";
import Dialog from "@/components/Dialog";
import Content from "./Content";
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

interface AddLabelDialog {
    resourceId?: number;
    variant: LabelResourceType;

    onLabelClick: (l: ILabel) => void;
    onLabelCreate?: (id: number) => void;
    onClose: () => void;
}

const AddLabelDialog: FC<AddLabelDialog> = ({
    resourceId,
    variant,

    onLabelClick,
    onLabelCreate,
    onClose,
}) => (
    <Dialog
        onClose={onClose}
        DialogContentComponent={StyledContent}
        DialogActionsComponent={StyledActions}
        // ...
        submit
        // ...
        hideTitle
        content={
            <Content
                resourceId={resourceId}
                resource={variant}
                // ...
                onLabelCreate={onLabelCreate}
                onLabelClick={onLabelClick}
            />
        }
        actions={<CloseButton onClick={onClose} />}
    />
);

export default AddLabelDialog;
