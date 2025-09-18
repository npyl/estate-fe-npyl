const ConfirmDialog = dynamic(() => import("@/ui/confirm-dialog"));
import useDialog from "@/hooks/useDialog";
import { useDeleteCardMutation } from "@/services/tasks";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import dynamic from "next/dynamic";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface DeleteItemProps {
    taskId: number;
}

const DeleteItem: FC<DeleteItemProps> = ({ taskId }) => {
    const { t } = useTranslation();

    const [isOpen, openConfirm, closeConfirm] = useDialog();

    const [deleteTask] = useDeleteCardMutation();

    const handleDelete = () =>
        deleteTask({
            props: { cardId: taskId },
            tabPaths: [`/tasks/${taskId}`],
        });

    return (
        <>
            <MenuItem onClick={openConfirm}>{t("Delete")}</MenuItem>

            {isOpen ? (
                <ConfirmDialog
                    onClose={closeConfirm}
                    // ...
                    title={t("Delete task?")}
                    actions={
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                        >
                            {t("Delete")}
                        </Button>
                    }
                />
            ) : null}
        </>
    );
};

export default DeleteItem;
