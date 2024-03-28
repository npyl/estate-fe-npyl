import { useState } from "react";
// @mui
import { Button, IconButton, Stack, Tooltip } from "@mui/material";
// hooks
import useResponsive from "../../../../hooks/useResponsive";
// components
import ConfirmDialog from "../../../../components/confirm-dialog";
import Iconify from "../../../../components/iconify";

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

    return (
        <>
            <Stack p={2.5} direction="row" alignItems="center">
                {!isDesktop && (
                    <>
                        <Tooltip title="Back">
                            <IconButton onClick={onCloseDetails} sx={{ mr: 1 }}>
                                <Iconify icon="eva:arrow-ios-back-fill" />
                            </IconButton>
                        </Tooltip>
                    </>
                )}

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
                    {completed ? "Completed" : "Mark Complete"}
                </Button>

                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-end"
                    flexGrow={1}
                >
                    <Tooltip title="Attachment">
                        <IconButton size="small" onClick={onAttach}>
                            <Iconify icon="eva:attach-2-fill" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete task">
                        <IconButton onClick={handleOpenConfirm} size="small">
                            <Iconify icon="eva:trash-2-outline" />
                        </IconButton>
                    </Tooltip>

                    <IconButton size="small">
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </Stack>
            </Stack>

            <input ref={fileInputRef} type="file" style={{ display: "none" }} />

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Delete"
                content={
                    <>
                        Are you sure want to delete{" "}
                        <strong> {taskName} </strong>?
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                }
            />
        </>
    );
}
