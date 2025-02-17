import { Button, IconButton, Popover, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SoftButton from "@/components/SoftButton";
import { useTranslation } from "react-i18next";
const DeleteDialog = dynamic(() => import("@/components/Dialog/Delete"));
import useDialog from "@/hooks/useDialog";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { FC, useCallback, useRef } from "react";
import OpenIn from "./OpenIn";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/use-auth";
import ConfirmDialog from "@/components/confirm-dialog";
import ArchiveIcon from "@mui/icons-material/Archive";
import UndoIcon from "@mui/icons-material/Undo";
import { useRouter } from "next/router";
import { useRestorePropertyMutation } from "@/services/properties";
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
const NewTaskButton = dynamic(() => import("./NewTaskButton"));

const RestoreButton = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { propertyId } = router.query;

    const [restore] = useRestorePropertyMutation();

    const handleRestore = useCallback(async () => {
        const res = await restore(+propertyId!);
        if ("error" in res) return;
        router.replace("/property");
    }, [propertyId]);

    return (
        <SoftButton
            fullWidth
            color="warning"
            startIcon={<UndoIcon />}
            onClick={handleRestore}
        >
            {t("Restore")}
        </SoftButton>
    );
};

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
                    action={
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

interface MoreButtonProps {
    isProperty: boolean;
    isArchived: boolean;
    onEdit: VoidFunction;
    onDelete: VoidFunction;
    onArchive?: VoidFunction;
    onClone?: VoidFunction;
}

const MoreButton = ({
    isProperty,
    isArchived,
    onEdit,
    onDelete,
    onArchive,
    onClone,
}: MoreButtonProps) => {
    const { t } = useTranslation();

    const anchorRef = useRef(null);

    const [isOpen, openPopover, closePopover] = useDialog();

    const handleEdit = useCallback(() => {
        closePopover();
        onEdit();
    }, [onEdit]);
    const handleClone = useCallback(() => {
        closePopover();
        onClone?.();
    }, [onClone]);
    const handleDelete = useCallback(() => {
        closePopover();
        onDelete();
    }, [onDelete]);
    const handleArchive = useCallback(() => {
        closePopover();
        onArchive?.();
    }, [onArchive]);

    return (
        <>
            <IconButton ref={anchorRef} size="small" onClick={openPopover}>
                <MoreVertOutlinedIcon />
            </IconButton>

            {isOpen ? (
                <Popover
                    open
                    anchorEl={anchorRef.current}
                    onClose={closePopover}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    <Stack
                        alignItems="center"
                        justifyContent="flex-start"
                        p={1}
                        spacing={1}
                        sx={{ minWidth: 150 }}
                    >
                        {isProperty && <OpenIn />}

                        {!isArchived && onClone ? (
                            <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                startIcon={
                                    <ControlPointDuplicateOutlinedIcon />
                                }
                                onClick={handleClone}
                                sx={{ justifyContent: "flex-start" }}
                            >
                                {t("Clone")}
                            </Button>
                        ) : null}

                        {!isArchived ? (
                            <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                onClick={handleEdit}
                                startIcon={<EditOutlinedIcon />}
                                sx={{ justifyContent: "flex-start" }}
                            >
                                {t("Edit")}
                            </Button>
                        ) : null}

                        {isProperty ? <NewTaskButton /> : null}

                        {isArchived ? <RestoreButton /> : null}

                        <DeleteOrArchiveButton
                            isProperty={isProperty}
                            isArchived={isArchived}
                            onDelete={handleDelete}
                            onArchive={handleArchive}
                        />
                    </Stack>
                </Popover>
            ) : null}
        </>
    );
};

export default MoreButton;
