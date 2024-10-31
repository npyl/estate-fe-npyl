import { useState } from "react";
// @mui
import { Button, IconButton, Stack, Tooltip } from "@mui/material";
// hooks
import useResponsive from "@/hooks/useResponsive";
// components
import ConfirmDialog from "@/components/confirm-dialog";
import Iconify from "@/components/iconify";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "@/components/styled";
// ----------------------------------------------------------------------

type Props = {
    fileInputRef: React.RefObject<HTMLInputElement>;
    taskName: string;
    liked: boolean;
    completed: boolean;
    onLike: VoidFunction;
    onAttach: VoidFunction;
    onDelete: VoidFunction;
    onCompleted: VoidFunction;
    onCloseDetails: VoidFunction;
};

export default function KanbanDetailsToolbar({
    fileInputRef,
    taskName,
    liked,
    completed,
    onLike,
    onAttach,
    onDelete,
    onCompleted,
    onCloseDetails,
}: Props) {
    const isDesktop = useResponsive("up", "sm");

    const [openConfirm, setOpenConfirm] = useState(false);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const { t } = useTranslation();
    return (
        <>
            <SpaceBetween p={2.5} direction="row" alignItems="center">
                <Stack direction="row" spacing={1}>
                    {!isDesktop ? (
                        <Tooltip title="Back">
                            <IconButton onClick={onCloseDetails}>
                                <Iconify icon="eva:arrow-ios-back-fill" />
                            </IconButton>
                        </Tooltip>
                    ) : null}

                    <Button
                        size="small"
                        variant="outlined"
                        color={completed ? "primary" : "inherit"}
                        startIcon={
                            completed && (
                                <Iconify
                                    icon="eva:checkmark-fill"
                                    width={16}
                                    mb={1.5}
                                />
                            )
                        }
                        onClick={onCompleted}
                    >
                        {completed ? t("Completed") : t("Mark Complete")}
                    </Button>
                </Stack>

                <Tooltip title={t("Delete task")}>
                    <IconButton onClick={handleOpenConfirm} size="small">
                        <Iconify icon="eva:trash-2-outline" />
                    </IconButton>
                </Tooltip>
            </SpaceBetween>

            <input ref={fileInputRef} type="file" style={{ display: "none" }} />

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title={t("Delete")}
                content={
                    <>
                        {t("Are you sure want to delete")}
                        {""}
                        <strong> {taskName} </strong>?
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onDelete}
                    >
                        {t("Delete")}
                    </Button>
                }
            />
        </>
    );
}
