import {
    CalendarDayViewProps,
    CalendarMonthViewProps,
    CalendarWeekViewProps,
    CalendarYearViewProps,
    TCalendarEvent,
} from "@/components/Calendar/types";
import useEventMutations from "./useEventMutations";
import { Button, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, useState } from "react";
import { useTranslation } from "react-i18next";
// ...
const EditEventDialog = dynamic(() => import("./EditEvent"));
const ConfirmDialog = dynamic(() => import("@/components/confirm-dialog"));

type AnyCalendarViewProps =
    | CalendarDayViewProps
    | CalendarWeekViewProps
    | CalendarMonthViewProps
    | CalendarYearViewProps;

type AnyCalendarView = ComponentType<AnyCalendarViewProps>;

const WithActions = (View: AnyCalendarView) => {
    const { t } = useTranslation();

    const { deleteEvent } = useEventMutations();

    const [deleteEventId, setDeleteEventId] = useState("");
    const closeConfirm = () => setDeleteEventId("");

    const [editEvent, setEditEvent] = useState<TCalendarEvent>();
    const closeEdit = () => setEditEvent(undefined);

    const handleDelete = () => {
        deleteEvent(deleteEventId);
        closeConfirm();
    };

    return (props: AnyCalendarViewProps) => (
        <>
            <View
                {...props}
                onEventDelete={setDeleteEventId}
                onEventEdit={setEditEvent}
            />

            {editEvent ? <EditEventDialog onClose={closeEdit} /> : null}

            {deleteEventId ? (
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
                    onClose={closeConfirm}
                />
            ) : null}
        </>
    );
};

export default WithActions;
