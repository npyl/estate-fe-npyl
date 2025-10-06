import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { LabelResourceType } from "@/types/label";
import { FC, useCallback } from "react";
import useDialog from "@/hooks/useDialog";
import EditDialog from "./EditDialog";

interface EditButtonProps {
    resource: LabelResourceType;
    labelId: number;
    onClose: VoidFunction;
}

const EditButton: FC<EditButtonProps> = ({
    resource,
    labelId,
    onClose: _onClose,
}) => {
    const [isOpen, open, close] = useDialog();
    const onClose = useCallback(() => {
        close();
        _onClose();
    }, [_onClose]);

    return (
        <>
            <IconButton onClick={open}>
                <EditIcon fontSize="small" />
            </IconButton>

            {isOpen ? (
                <EditDialog
                    resource={resource}
                    labelId={labelId}
                    onCancel={onClose}
                />
            ) : null}
        </>
    );
};

export default EditButton;
