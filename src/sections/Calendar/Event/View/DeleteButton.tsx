import { Button, IconButton, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import useEventMutations from "./useEventMutations";
import { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import useDialog from "@/hooks/useDialog";
import { useTranslation } from "react-i18next";
// ...
const ConfirmDialog = dynamic(() => import("@/components/confirm-dialog"));

interface DeleteButtonProps {
    eventId?: string;
    onClose: VoidFunction;
}

const DeleteButton: FC<DeleteButtonProps> = ({ eventId, onClose }) => {
    const { t } = useTranslation();

    const { deleteEvent } = useEventMutations();

    const [isDelete, openDelete, closeDelete] = useDialog();

    const handleDelete = () => {
        if (!eventId) return;
        deleteEvent(eventId);
        onClose();
    };

    return (
        <>
            <IconButton onClick={openDelete}>
                <DeleteIcon />
            </IconButton>

            {/* Delete */}
            {isDelete ? (
                <ConfirmDialog
                    open
                    title={t("Delete Event")}
                    content={
                        <Typography>
                            {t("Are you sure you want to delete this event?")}
                        </Typography>
                    }
                    action={
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                        >
                            {t("Delete")}
                        </Button>
                    }
                    onClose={closeDelete}
                />
            ) : null}
        </>
    );
};

export default DeleteButton;
