import { Button, IconButton } from "@mui/material";
import { FC, MouseEvent, useCallback } from "react";
import { useTranslation } from "react-i18next";
const UserForm = dynamic(() => import("@/sections/User/Form"));
import { useDeleteUserMutation } from "@/services/user";
import dynamic from "next/dynamic";
import useDialog from "@/hooks/useDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "@/components/confirm-dialog";

interface DeleteButtonProps {
    userId: number;
}

const DeleteButton: FC<DeleteButtonProps> = ({ userId }) => {
    const { t } = useTranslation();
    const [isOpen, open, close] = useDialog();
    const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        open();
    }, []);
    const [deleteUser] = useDeleteUserMutation();

    // TODO: transfer?!
    const onDelete = useCallback(
        () => deleteUser({ userId, transferId: -1 }),
        [userId]
    );
    return (
        <>
            <IconButton onClick={onClick}>
                <DeleteIcon />
            </IconButton>

            {isOpen ? (
                <ConfirmDialog
                    open
                    title={t("DELETE_USER_0")}
                    action={
                        <Button
                            disabled
                            color="error"
                            variant="contained"
                            onClick={onDelete}
                        >
                            {t("Delete")}
                        </Button>
                    }
                    onClose={close}
                />
            ) : null}
        </>
    );
};

export default DeleteButton;
