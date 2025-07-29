import { IconButton, Stack, Typography } from "@mui/material";
import { FC, MouseEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeleteUserMutation } from "@/services/user";
import useDialog from "@/hooks/useDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "@/ui/confirm-dialog";
import { LoadingButton } from "@mui/lab";
import AssigneeAutocomplete from "@/ui/Autocompletes/Assignee";

interface DeleteDialogProps {
    userId: number;
    onClose: VoidFunction;
}

const DeleteDialog: FC<DeleteDialogProps> = ({ userId, onClose }) => {
    const { t } = useTranslation();

    const [deleteUser, { isLoading }] = useDeleteUserMutation();

    const [transferId, setTransferId] = useState<number>();

    const onDelete = useCallback(() => {
        if (!Boolean(transferId)) return;
        deleteUser({ userId, transferId: transferId! });
    }, [userId, transferId]);

    const Actions = Boolean(transferId) ? (
        <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            color="error"
            variant="contained"
            onClick={onDelete}
        >
            {t("Delete")}
        </LoadingButton>
    ) : undefined;

    return (
        <ConfirmDialog
            open
            title={t("DELETE_USER_0")}
            content={
                <Stack spacing={1}>
                    <Typography>{t("TRANSFER_TO")}</Typography>
                    <AssigneeAutocomplete
                        label={t("User")}
                        value={transferId}
                        onChange={setTransferId}
                    />
                </Stack>
            }
            actions={Actions}
            onClose={onClose}
        />
    );
};

interface DeleteButtonProps {
    userId: number;
}

const DeleteButton: FC<DeleteButtonProps> = ({ userId }) => {
    const [isOpen, open, close] = useDialog();
    const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        open();
    }, []);

    return (
        <>
            <IconButton size="small" onClick={onClick}>
                <DeleteIcon fontSize="small" />
            </IconButton>

            {isOpen ? <DeleteDialog userId={userId} onClose={close} /> : null}
        </>
    );
};

export default DeleteButton;
