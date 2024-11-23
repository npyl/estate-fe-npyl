import {
    Button,
    IconButton,
    InputBase,
    Stack,
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
import {
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
} from "../styled";
import { CalendarEventReq } from "@/types/calendar";
import { LocationSearching } from "@mui/icons-material";
import { SpaceBetween } from "@/components/styled";
import DateInfo from "@/components/Calendar/Event/_shared/DateInfo";
import People from "@/components/Calendar/Event/_shared/People";
// ...
const EditForm = dynamic(() => import("../form"));
const ConfirmDialog = dynamic(() => import("@/components/confirm-dialog"));

// -----------------------------------------------------------

const getDialogSx = (isEdit: boolean): SxProps<Theme> => ({
    "& .MuiDialogTitle-root": {
        display: isEdit ? "none" : "block",
    },

    "& .MuiPaper-root": {
        minHeight: "300px",
    },
});

// -----------------------------------------------------------

const DescriptionSx: SxProps<Theme> = {
    px: 1,
    height: "100%",
    bgcolor: (theme) =>
        theme.palette.mode === "light"
            ? theme.palette.neutral?.[200]
            : theme.palette.neutral?.[700],
    borderRadius: "5px",
};

interface Props {
    event: TCalendarEvent;
    actions?: boolean;
    onClose: VoidFunction;
}

const EventDialog: FC<Props> = ({ event, actions = true, onClose }) => {
    const { t } = useTranslation();

    const { deleteEvent, editEvent } = useEventMutations();

    const [isEdit, openEdit, closeEdit] = useDialog();
    const [isDelete, openDelete, closeDelete] = useDialog();

    const title = isEdit ? t("Edit") + " " + event.title : event.title;

    const handleEdit = async (e: CalendarEventReq) => {
        await editEvent(e);
        onClose();
    };

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
                    <Stack direction="row" width={1} alignItems="center">
                        <Typography
                            variant="h6"
                            textAlign="left"
                            px={1}
                            noWrap
                            width="calc(100% - 150px)"
                        >
                            {title}
                        </Typography>

                        {actions && !isEdit ? (
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
                    </Stack>
                }
                content={
                    isEdit ? (
                        <EditForm
                            event={event}
                            onSubmit={handleEdit}
                            onClose={closeEdit}
                        />
                    ) : (
                        <Stack spacing={1} px={1}>
                            <SpaceBetween alignItems="center" px={1}>
                                <Stack direction="row" alignItems="center">
                                    <DateInfo
                                        date={event.startDate}
                                        width="fit-content"
                                        px={1}
                                        py={0.5}
                                        bgcolor="transparent"
                                        color="text.secondary"
                                        fontSize="14px"
                                    />

                                    <Duration
                                        start={event.startDate}
                                        end={event.endDate}
                                        bgcolor="transparent"
                                        color="text.secondary"
                                        fontSize="14px"
                                    />
                                </Stack>

                                <Stack direction="row" spacing={1}>
                                    <LocationSearching />
                                    <Typography color="text.secondary">
                                        {event?.location || "-"}
                                    </Typography>
                                </Stack>
                            </SpaceBetween>

                            <InputBase
                                value={event?.description}
                                sx={DescriptionSx}
                                multiline
                                rows={5}
                            />

                            <People p={event?.people} type={event.type} />
                        </Stack>
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
