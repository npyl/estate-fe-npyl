import { FC } from "react";
import PPDeleteDialog from "@/ui/Dialog/Delete";
import { useDeleteRoleMutation } from "@/services/roles";

// --------------------------------------------------------------------------

interface DeleteDialogProps {
    roleId: number;
    onClose: VoidFunction;
}

const DeleteDialog: FC<DeleteDialogProps> = ({ roleId, onClose }) => {
    const [deleteRole, { isLoading }] = useDeleteRoleMutation();

    const onDelete = async () => {
        await deleteRole(roleId);
        onClose();
    };

    return (
        <PPDeleteDialog
            loading={isLoading}
            onDelete={onDelete}
            onClose={onClose}
        />
    );
};

export default DeleteDialog;
