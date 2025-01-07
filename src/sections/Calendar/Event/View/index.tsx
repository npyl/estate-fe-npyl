import {
    IconButton,
    InputBase,
    Popover,
    Stack,
    SxProps,
    Theme,
    Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import useEventMutations from "./useEventMutations";
import { FC } from "react";
import { TCalendarEvent } from "@/components/Calendar/types";
import Duration from "@/components/Calendar/Event/_shared/Duration";
import EditIcon from "@mui/icons-material/Edit";
import useDialog from "@/hooks/useDialog";
import { useTranslation } from "react-i18next";
import { CalendarEventReq } from "@/types/calendar";
import { LocationSearching } from "@mui/icons-material";
import { SpaceBetween } from "@/components/styled";
import DateInfo from "@/components/Calendar/Event/_shared/DateInfo";
import PeopleSection from "./PeopleSection";
// ...
const DeleteButton = dynamic(() => import("./DeleteButton"));
const EditForm = dynamic(() => import("../form"));

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
    anchorEl: any;
    event: TCalendarEvent;
    actions?: boolean;
    onClose: VoidFunction;
}

const EventPopover: FC<Props> = ({
    anchorEl,
    event,
    actions = true,
    onClose,
}) => {
    const { t } = useTranslation();

    const { editEvent } = useEventMutations();

    const [isEdit, openEdit, closeEdit] = useDialog();

    const title = isEdit ? t("Edit") + " " + event.title : event.title;

    const handleEdit = async (e: CalendarEventReq) => {
        await editEvent(e);
        onClose();
    };

    return (
        <Popover
            open
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: {
                        minWidth: "300px",
                        width: "max-content",
                        height: "max-content",
                    },
                },
            }}
        >
            <Stack width={1} direction="row" alignItems="center">
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

                        <DeleteButton eventId={event?.id} onClose={onClose} />
                    </Stack>
                ) : null}
            </Stack>
            {isEdit ? (
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

                    <PeopleSection people={event?.people} type={event?.type} />
                </Stack>
            )}
        </Popover>
    );
};

export default EventPopover;
