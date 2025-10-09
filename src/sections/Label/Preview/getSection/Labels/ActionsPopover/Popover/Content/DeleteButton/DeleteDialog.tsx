import { useDeleteLabelForResourceMutation } from "@/services/labels";
import { FC } from "react";
import { LabelResourceType } from "@/types/label";
import PPDeleteDialog from "@/ui/Dialog/Delete";

// --------------------------------------------------------------------------

interface DeleteDialogProps {
    resource: LabelResourceType;
    labelId: number;
    onClose: VoidFunction;
}

const DeleteDialog: FC<DeleteDialogProps> = ({
    resource,
    labelId,
    onClose,
}) => {
    const [deleteForResource, { isLoading }] =
        useDeleteLabelForResourceMutation();

    const onDelete = async () => {
        await deleteForResource({ resource, labelId });
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
