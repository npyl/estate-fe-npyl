const ConfirmDialog = dynamic(() => import("@/ui/Dialog/Confirm"));
import useDialog from "@/hooks/useDialog";
import { useDeleteColumnMutation } from "@/services/tasks";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import dynamic from "next/dynamic";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    columnId: number;
}

const DeleteColumnItem: FC<Props> = ({ columnId }) => {
    const { t } = useTranslation();

    const [isOpen, openConfirm, closeConfirm] = useDialog();

    const [deleteColumn] = useDeleteColumnMutation();

    const handleDelete = () => deleteColumn({ columnId });

    return (
        <>
            <MenuItem onClick={openConfirm}>{t("Delete")}</MenuItem>

            {isOpen ? (
                <ConfirmDialog
                    onClose={closeConfirm}
                    // ...
                    title={t("Delete column?")}
                    content={t("Deleting a column will also delete the tasks")}
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

export default DeleteColumnItem;
