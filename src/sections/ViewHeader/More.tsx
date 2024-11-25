import { Button, IconButton, Popover, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SoftButton from "@/components/SoftButton";
import { useTranslation } from "react-i18next";
const DeleteDialog = dynamic(() => import("@/components/Dialog/Delete"));
import useDialog from "@/hooks/useDialog";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import React, { FC, useCallback, useRef } from "react";
import OpenIn from "./OpenIn";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/use-auth";
import ConfirmDialog from "@/components/confirm-dialog";
import ArchiveIcon from "@mui/icons-material/Archive";

interface Props {
    isProperty: boolean;
    onDelete: VoidFunction;
    onArchive: VoidFunction;
}

const DeleteOrArchiveButton: FC<Props> = ({
    isProperty,
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
            {isAdmin && isProperty ? (
                <SoftButton
                    fullWidth
                    color="error"
                    onClick={openArchive}
                    startIcon={<ArchiveIcon />}
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
    onEdit: VoidFunction;
    onDelete: VoidFunction;
    onArchive?: VoidFunction;
    onClone?: VoidFunction;
}

const MoreButton = ({
    isProperty,
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
                        p={1}
                        spacing={1}
                        sx={{ minWidth: 150 }}
                    >
                        {isProperty && <OpenIn />}

                        {onClone ? (
                            <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                onClick={handleClone}
                            >
                                {t("Clone")}
                            </Button>
                        ) : null}

                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={handleEdit}
                        >
                            {t("Edit")}
                        </Button>

                        <DeleteOrArchiveButton
                            isProperty={isProperty}
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
