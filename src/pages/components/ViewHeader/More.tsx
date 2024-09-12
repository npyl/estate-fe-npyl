import { Button, IconButton, Popover, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SoftButton from "@/components/SoftButton";
import { useTranslation } from "react-i18next";
import DeleteDialog from "@/components/Dialog/Delete";
import useDialog from "@/hooks/useDialog";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import React from "react";
import OpenIn from "./OpenIn";

interface MoreButtonProps {
    isProperty: boolean;
    onEdit: VoidFunction;
    onDelete: VoidFunction;
    onClone?: VoidFunction;
}

const MoreButton = ({
    isProperty,
    onEdit,
    onDelete,
    onClone,
}: MoreButtonProps) => {
    const { t } = useTranslation();

    const [isDeleteOpen, openDelete, closeDelete] = useDialog();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        openDelete();
        handleClose(); // Ensure the popover is closed before showing the delete dialog
    };

    return (
        <>
            <IconButton size="small" onClick={handleClick}>
                <MoreVertOutlinedIcon />
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
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

                    {onClone && (
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                onClone();
                                handleClose();
                            }}
                        >
                            {t("Clone")}
                        </Button>
                    )}

                    <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            onEdit();
                            handleClose();
                        }}
                    >
                        {t("Edit")}
                    </Button>

                    <SoftButton
                        fullWidth
                        color="error"
                        onClick={handleDelete}
                        startIcon={<DeleteIcon />}
                    >
                        {t("Delete")}
                    </SoftButton>
                </Stack>
            </Popover>

            <DeleteDialog
                open={isDeleteOpen}
                onClose={closeDelete}
                onDelete={onDelete}
            />
        </>
    );
};

export default MoreButton;
