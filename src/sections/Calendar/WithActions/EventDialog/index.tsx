import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    styled,
    SxProps,
    Theme,
    Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import useEventMutations from "./useEventMutations";
import { FC } from "react";
import { TCalendarEvent } from "@/components/Calendar/types";
import Dialog from "@/components/Dialog";
import Duration from "@/components/Calendar/Event/_shared/Duration";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useDialog from "@/hooks/useDialog";
import { useTranslation } from "react-i18next";
// ...
const EditForm = dynamic(() => import("./EditForm"));
const ConfirmDialog = dynamic(() => import("@/components/confirm-dialog"));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    padding: theme.spacing(1),
    position: "relative",
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(1),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(0),
}));

// -----------------------------------------------------------

const getDialogSx = (isEdit: boolean): SxProps<Theme> => ({
    "& .MuiDialogTitle-root": {
        display: isEdit ? "none" : "block",
    },
});

// -----------------------------------------------------------

interface Props {
    event: TCalendarEvent;
    onClose: VoidFunction;
}

const EventDialog: FC<Props> = ({ event, onClose }) => {
    const { t } = useTranslation();

    const { deleteEvent } = useEventMutations();

    const [isEdit, openEdit, closeEdit] = useDialog();
    const [isDelete, openDelete, closeDelete] = useDialog();

    const title = isEdit ? t("Edit") + " " + event.title : event.title;

    const handleDelete = () => {
        if (!event?.id) return;
        deleteEvent(event.id);
        onClose();
    };

    return (
        <>
            <Dialog
                open
                sx={getDialogSx(isEdit)}
                DialogTitleComponent={StyledDialogTitle}
                DialogContentComponent={StyledDialogContent}
                DialogActionsComponent={StyledDialogActions}
                title={
                    <>
                        <Typography>{title}</Typography>

                        {!isEdit ? (
                            <Stack
                                direction="row"
                                spacing={1}
                                position="absolute"
                                right={50}
                                top={1}
                                p={1}
                            >
                                <IconButton onClick={openEdit}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={openDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        ) : null}
                    </>
                }
                content={
                    isEdit ? (
                        <EditForm event={event} onClose={closeEdit} />
                    ) : (
                        <>
                            <Duration
                                start={event.startDate}
                                end={event.endDate}
                            />
                        </>
                    )
                }
                onClose={onClose}
            />

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

export default EventDialog;
