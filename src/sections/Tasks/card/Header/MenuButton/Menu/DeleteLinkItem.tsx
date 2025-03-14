const ConfirmDialog = dynamic(() => import("@/components/confirm-dialog"));
import useDialog from "@/hooks/useDialog";
import { useDeleteCardMutation } from "@/services/tasks";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import dynamic from "next/dynamic";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useFiltersContext } from "@/sections/Tasks/filters";

interface DeleteItemProps {
    taskId: number;
}

const DeleteItem: FC<DeleteItemProps> = ({ taskId }) => {
    const { t } = useTranslation();

    const [isOpen, openConfirm, closeConfirm] = useDialog();

    const { search, priority, assigneeId } = useFiltersContext();
    const filters = { search, priority, assigneeId };

    const [deleteTask] = useDeleteCardMutation();

    const handleDelete = () =>
        deleteTask({
            props: { cardId: taskId, filters },
            tabPaths: [`/tasks?taskId=${taskId}`],
        });

    return (
        <>
            <MenuItem onClick={openConfirm}>{t("Delete")}</MenuItem>

            {isOpen ? (
                <ConfirmDialog
                    open
                    onClose={closeConfirm}
                    // ...
                    title={t("Delete task?")}
                    action={
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
