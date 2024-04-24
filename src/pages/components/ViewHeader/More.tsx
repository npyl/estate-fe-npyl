import { Button, IconButton, Popover, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { SoftButton } from "src/components/SoftButton";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { DeleteDialog } from "src/components/Dialog/Delete";
import useDialog from "src/hooks/useDialog";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import React from "react";
import OpenIn from "./OpenIn";

interface MoreButtonProps {
    onEdit: VoidFunction;
    onDelete: VoidFunction;
    onClone?: VoidFunction;
}

const MoreButton = ({ onEdit, onDelete, onClone }: MoreButtonProps) => {
    const pathname = usePathname();
    const { t } = useTranslation();

    const isProperty = useMemo(() => pathname.includes("property"), [pathname]);

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
                    horizontal: "right",
                }}
            >
                <Stack alignItems="center" p={1} spacing={1}>
                    {isProperty ? <OpenIn /> : null}

                    {onClone ? (
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={onClone}
                        >
                            {t("Clone")}
                        </Button>
                    ) : null}

                    <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        onClick={onEdit}
                    >
                        {t("Edit")}
                    </Button>

                    <SoftButton
                        fullWidth
                        color="error"
                        onClick={openDelete}
                        startIcon={<DeleteIcon />}
                    >
                        {t("Delete")}
                    </SoftButton>

                    {isDeleteOpen ? (
                        <DeleteDialog
                            open={isDeleteOpen}
                            onClose={closeDelete}
                            onDelete={onDelete}
                        />
                    ) : null}
                </Stack>
            </Popover>
        </>
    );
};

export default MoreButton;
