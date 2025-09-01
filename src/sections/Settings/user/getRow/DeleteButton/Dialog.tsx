import { Stack, Typography } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeleteUserMutation } from "@/services/user";
import ConfirmDialog from "@/ui/confirm-dialog";
import { LoadingButton } from "@mui/lab";
import AssigneeAutocomplete from "@/ui/Autocompletes/Assignee";
import isFalsy from "@/utils/isFalsy";

interface DeleteDialogProps {
    userId: number;
    onClose: VoidFunction;
}

const DeleteDialog: FC<DeleteDialogProps> = ({ userId, onClose }) => {
    const { t } = useTranslation();

    const [deleteUser, { isLoading }] = useDeleteUserMutation();

    const [transferId, setTransferId] = useState<number>();

    const onDelete = useCallback(async () => {
        if (isFalsy(transferId)) return;
        await deleteUser({ userId, transferId: transferId! });
        onClose();
    }, [userId, transferId]);

    const Actions = isFalsy(transferId) ? undefined : (
        <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            color="error"
            variant="contained"
            onClick={onDelete}
        >
            {t("Delete")}
        </LoadingButton>
    );

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

export default DeleteDialog;
