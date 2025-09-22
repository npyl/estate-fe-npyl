import { ILabel, LabelResourceType } from "@/types/label";
import Dialog from "@/components/Dialog";
import Content from "./Content";
import { FC } from "react";
import { DialogContent, DialogContentProps } from "@mui/material";
import CloseButton from "./CloseButton";

const StyledContent: FC<DialogContentProps> = ({ sx, ...props }) => (
    <DialogContent sx={{ p: 0, ...sx }} {...props} />
);

interface AddLabelDialog {
    resourceId?: number;
    variant: LabelResourceType;

    onLabelClick: (l: ILabel) => void;
    onCreate?: (id: number) => void;
    onClose: () => void;
}

const AddLabelDialog: FC<AddLabelDialog> = ({
    resourceId,
    variant,

    onLabelClick,
    onCreate,
    onClose,
}) => (
    <Dialog
        onClose={onClose}
        DialogContentComponent={StyledContent}
        // ...
        submit
        // ...
        hideTitle
        content={
            <Content
                resourceId={resourceId}
                resource={variant}
                onCreate={onCreate}
                // ...
                onLabelClick={onLabelClick}
            />
        }
        actions={<CloseButton onClick={onClose} />}
    />
);

export default AddLabelDialog;
