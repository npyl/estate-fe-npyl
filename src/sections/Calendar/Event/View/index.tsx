import { IconButton, Stack, SxProps, Theme, Typography } from "@mui/material";
import Popover from "../Popover";
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
import Description from "@/components/Calendar/Event/_shared/Description";
// ...
const DeleteButton = dynamic(() => import("./DeleteButton"));
const EditForm = dynamic(() => import("../form"));

// ---------------------------------------------------------------------------

const DescriptionSx: SxProps<Theme> = {
    bgcolor: (theme) =>
        theme.palette.mode === "light"
            ? theme.palette.neutral?.[200]
            : theme.palette.neutral?.[700],
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

    const title = isEdit ? `${event.title} (${t("Edit")})` : event.title;

    const handleEdit = async (e: CalendarEventReq) => {
        await editEvent(e);
        onClose();
    };

    return (
        <Popover open anchorEl={anchorEl} onClose={onClose}>
            <SpaceBetween width={1} direction="row" alignItems="center">
                {!isEdit ? (
                    <Typography
                        variant="h6"
                        textAlign="left"
                        noWrap
                        minWidth="fit-content"
                        maxWidth="calc(100% - 150px)"
                    >
                        {title}
                    </Typography>
                ) : null}

                {actions && !isEdit ? (
                    <Stack direction="row" spacing={1}>
                        <IconButton size="small" onClick={openEdit}>
                            <EditIcon fontSize="small" />
                        </IconButton>

                        <DeleteButton eventId={event?.id} onClose={onClose} />
                    </Stack>
                ) : null}
            </SpaceBetween>
            {isEdit ? (
                <EditForm
                    event={event}
                    onSubmit={handleEdit}
                    onClose={closeEdit}
                />
            ) : (
                <Stack spacing={1}>
                    <Stack direction="row" alignItems="center">
                        <DateInfo
                            date={event.startDate}
                            width="fit-content"
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

                    <Description
                        content={event?.description}
                        containerSx={DescriptionSx}
                    />

                    <PeopleSection people={event?.people} type={event?.type} />
                </Stack>
            )}
        </Popover>
    );
};

export default EventPopover;
