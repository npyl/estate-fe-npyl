import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SoftButton from "@/components/SoftButton";
import { useTranslation } from "react-i18next";
const DeleteDialog = dynamic(() => import("@/components/Dialog/Delete"));
import useDialog from "@/hooks/useDialog";
import { FC, useCallback } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/sections/use-auth";
import ConfirmDialog from "@/ui/confirm-dialog";
import ArchiveIcon from "@mui/icons-material/Archive";

interface Props {
    isProperty: boolean;
    isArchived: boolean;
    onDelete: VoidFunction;
    onArchive: VoidFunction;
}

const DeleteOrArchiveButton: FC<Props> = ({
    isProperty,
    isArchived,
    onDelete,
    onArchive,
}) => {
    const { t } = useTranslation();

    const { user } = useAuth();
    const isAdmin = user?.isAdmin;

    const [isArchiveOpen, openArchive, closeArchive] = useDialog();
    const [isDeleteOpen, openDelete, closeDelete] = useDialog();

    const handleDelete = useCallback(() => {
        onDelete();
        closeDelete();
    }, []);
    const handleArchive = useCallback(() => {
        onArchive();
        closeDelete();
    }, []);

    return (
        <>
            {isProperty && !isArchived ? (
                <SoftButton
                    fullWidth
                    color="error"
                    onClick={openArchive}
                    startIcon={<ArchiveIcon />}
                    sx={{ justifyContent: "flex-start" }}
                >
                    {t("Archive")}
                </SoftButton>
            ) : null}

            {isAdmin || !isProperty ? (
                <SoftButton
                    fullWidth
                    color="error"
                    onClick={openDelete}
                    startIcon={<DeleteIcon />}
                    sx={{ justifyContent: "flex-start" }}
                >
                    {t("Delete")}
                </SoftButton>
            ) : null}

            {isArchiveOpen ? (
                <ConfirmDialog
                    open
                    onClose={closeArchive}
                    title={t("Archive")}
                    actions={
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleArchive}
                            sx={{ justifyContent: "flex-start" }}
                        >
                            {t("Archive")}
                        </Button>
                    }
                />
            ) : null}

            {isDeleteOpen ? (
                <DeleteDialog
                    open
                    onClose={closeDelete}
                    onDelete={handleDelete}
                />
            ) : null}
        </>
    );
};

export default DeleteOrArchiveButton;
