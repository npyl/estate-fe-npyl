import { FC } from "react";
import PPDeleteDialog from "@/ui/Dialog/Delete";

// --------------------------------------------------------------------------

interface DeleteDialogProps {
    roleId: number;
    onClose: VoidFunction;
}

const DeleteDialog: FC<DeleteDialogProps> = ({ roleId, onClose }) => {
    // const [deleteForResource, { isLoading }] =
    //     useDeleteLabelForResourceMutation();

    const onDelete = async () => {
        // await deleteForResource({ roleId });
        onClose();
    };

    return (
        <PPDeleteDialog
            // loading={isLoading}
            onDelete={onDelete}
            onClose={onClose}
        />
    );
};

export default DeleteDialog;
