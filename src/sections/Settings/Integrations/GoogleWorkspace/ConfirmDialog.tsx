import ConfirmDialog from "@/ui/confirm-dialog";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ConfirmationDialogProps {
    onConfirm: VoidFunction;
    onClose: VoidFunction;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
    onConfirm,
    onClose,
}) => {
    const { t } = useTranslation();
    return (
        <ConfirmDialog
            open
            title={t("Delete")}
            content={<Typography>{t("_UPDATE_WORKSPACE_EMAILS_")}</Typography>}
            actions={
                <Button variant="contained" color="error" onClick={onConfirm}>
                    {t("Delete")}
                </Button>
            }
            onClose={onClose}
        />
    );
};

export default ConfirmationDialog;
