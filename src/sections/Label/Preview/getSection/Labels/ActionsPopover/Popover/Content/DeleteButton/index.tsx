import { IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { FC, useCallback } from "react";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { LabelResourceType } from "@/types/label";
const DeleteDialog = dynamic(() => import("./DeleteDialog"));

interface DeleteButtonProps {
    resource: LabelResourceType;
    labelId: number;
    onClose: VoidFunction;
}

const DeleteButton: FC<DeleteButtonProps> = ({
    resource,
    labelId,
    onClose: _onClose,
}) => {
    const [isDeleteOpen, openDelete, closeDelete] = useDialog();
    const onClose = useCallback(() => {
        closeDelete();
        _onClose();
    }, [_onClose]);

    return (
        <>
            <IconButton onClick={openDelete} sx={{ borderRadius: "100%" }}>
                <DeleteIcon fontSize="small" />
            </IconButton>

            {isDeleteOpen ? (
                <DeleteDialog
                    resource={resource}
                    labelId={labelId}
                    onClose={onClose}
                />
            ) : null}
        </>
    );
};

export default DeleteButton;
