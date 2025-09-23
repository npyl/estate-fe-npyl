import { useDeleteBlogPostMutation } from "@/services/blog";
import { Button, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
const PPConfirmDialog = dynamic(() => import("@/ui/DialogConfirm"));

interface DeleteButtonProps {
    postId: number;
    onClose: VoidFunction;
}

const ConfirmDialog: FC<DeleteButtonProps> = ({ postId, onClose }) => {
    const { t } = useTranslation();

    const [remove] = useDeleteBlogPostMutation();

    const handleDelete = useCallback(async () => {
        const res = await remove(postId);
        if ("error" in res) return;
        onClose();
    }, [postId]);

    return (
        <PPConfirmDialog
            title={t("Delete post?")}
            content={<Typography>{t("DELETE_POST_0")}</Typography>}
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

export default ConfirmDialog;
