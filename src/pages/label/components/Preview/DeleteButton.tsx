import { IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { FC } from "react";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { LabelResourceType } from "@/types/label";
const DeleteDialog = dynamic(() => import("./DeleteDialog"));

interface DeleteButtonProps {
    variant: LabelResourceType;
    labelId: number;
}

const DeleteButton: FC<DeleteButtonProps> = ({ variant, labelId }) => {
    const [isDeleteOpen, openDelete, closeDelete] = useDialog();

    return (
        <>
            <IconButton onClick={openDelete}>
                <DeleteIcon fontSize="small" />
            </IconButton>

            {isDeleteOpen ? (
                <DeleteDialog
                    variant={variant}
                    labelId={labelId}
                    onClose={closeDelete}
                />
            ) : null}
        </>
    );
};

export default DeleteButton;
