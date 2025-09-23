import { TextField } from "@mui/material";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useResetPasswordMutation } from "@/services/user";
import ConfirmDialog from "@/ui/DialogConfirm";
import { LoadingButton } from "@mui/lab";
import useTextField from "@/hooks/useTextField";

interface ResetDialogProps {
    userId: number;
    onClose: VoidFunction;
}

const ResetDialog: FC<ResetDialogProps> = ({ userId, onClose }) => {
    const { t } = useTranslation();

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const [newPassword, onChange] = useTextField();

    const onReset = useCallback(async () => {
        if (!newPassword) return;
        await resetPassword({ userId, newPassword });
        onClose();
    }, [userId, newPassword]);

    const Actions = newPassword ? (
        <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            variant="contained"
            onClick={onReset}
        >
            {t("Reset")}
        </LoadingButton>
    ) : undefined;

    return (
        <ConfirmDialog
            title={t("RESET_USER_PASSWORD")}
            content={
                <TextField
                    fullWidth
                    label={t("Password")}
                    type="password"
                    value={newPassword}
                    onChange={onChange}
                />
            }
            actions={Actions}
            onClose={onClose}
        />
    );
};

export default ResetDialog;
