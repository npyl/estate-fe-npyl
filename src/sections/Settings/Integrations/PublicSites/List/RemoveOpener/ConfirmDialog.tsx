import { useRemovePublicSiteMutation } from "@/services/company";
import { Button, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
const ConfirmDialog = dynamic(() => import("@/ui/confirm-dialog"));

interface DeleteButtonProps {
    siteId: number;
    onClose: VoidFunction;
}

const DeleteButton: FC<DeleteButtonProps> = ({ siteId, onClose }) => {
    const { t } = useTranslation();

    const [remove] = useRemovePublicSiteMutation();

    const handleDelete = useCallback(async () => {
        const res = await remove(siteId);
        if ("error" in res) return;
        onClose();
    }, [siteId]);

    return (
        <ConfirmDialog
            title={t("Delete public site?")}
            content={<Typography>{t("DELETE_PUBLIC_0")}</Typography>}
            actions={
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                >
                    {t("Delete")}
                </Button>
            }
            onClose={onClose}
        />
    );
};

export default DeleteButton;
