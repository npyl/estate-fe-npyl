import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC, useCallback } from "react";
import useDialog from "@/hooks/useDialog";
import { useDeleteAgreementMutation } from "@/services/agreements";
import dynamic from "next/dynamic";
const BaseDeleteDialog = dynamic(() => import("@/components/DialogDelete"));

// ------------------------------------------------------------

interface DeleteDialogProps {
    agreementId: number;
    onClose: VoidFunction;
}

const DeleteDialog: FC<DeleteDialogProps> = ({ agreementId, onClose }) => {
    const [deleteAgreement, { isLoading }] = useDeleteAgreementMutation();
    const handleDelete = useCallback(async () => {
        await deleteAgreement({
            tabPaths: [`/agreements/${agreementId}`],
            props: agreementId,
        });
        onClose();
    }, [agreementId]);

    return (
        <BaseDeleteDialog
            loading={isLoading}
            onClose={onClose}
            onDelete={handleDelete}
        />
    );
};

// ------------------------------------------------------------

interface DeleteButtonProps {
    agreementId: number;
}

const DeleteButton: FC<DeleteButtonProps> = ({ agreementId }) => {
    const [isOpen, openDialog, closeDialog] = useDialog();

    return (
        <>
            <IconButton color="error" onClick={openDialog}>
                <DeleteIcon />
            </IconButton>

            {isOpen ? (
                <DeleteDialog agreementId={agreementId} onClose={closeDialog} />
            ) : null}
        </>
    );
};

export default DeleteButton;
