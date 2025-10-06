import { IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { FC } from "react";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { LabelResourceType } from "@/types/label";
const DeleteDialog = dynamic(() => import("./DeleteDialog"));

interface DeleteButtonProps {
    resource: LabelResourceType;
    labelId: number;
}

const DeleteButton: FC<DeleteButtonProps> = ({ resource, labelId }) => {
    const [isDeleteOpen, openDelete, closeDelete] = useDialog();

    return (
        <>
            <IconButton onClick={openDelete} sx={{ borderRadius: "100%" }}>
                <DeleteIcon fontSize="small" />
            </IconButton>

            {isDeleteOpen ? (
                <DeleteDialog
                    resource={resource}
                    labelId={labelId}
                    onClose={closeDelete}
                />
            ) : null}
        </>
    );
};

export default DeleteButton;
