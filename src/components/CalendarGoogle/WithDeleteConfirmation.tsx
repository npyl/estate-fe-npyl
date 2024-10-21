import {
    CalendarDayViewProps,
    CalendarMonthViewProps,
    CalendarWeekViewProps,
    CalendarYearViewProps,
} from "@/components/Calendar/types";
import useEventMutations from "./useEventMutations";
import { Button, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, useState } from "react";
import { useTranslation } from "react-i18next";
const ConfirmDialog = dynamic(() => import("@/components/confirm-dialog"));

type AnyCalendarViewProps =
    | CalendarDayViewProps
    | CalendarWeekViewProps
    | CalendarMonthViewProps
    | CalendarYearViewProps;

type AnyCalendarView = ComponentType<AnyCalendarViewProps>;

const WithDeleteConfirmation = (View: AnyCalendarView) => {
    const { t } = useTranslation();

    const { deleteEvent } = useEventMutations();

    const [eventId, setEventId] = useState("");
    const closeConfirm = () => setEventId("");

    const handleDelete = () => {
        deleteEvent(eventId);
        closeConfirm();
    };

    return (props: AnyCalendarViewProps) => (
        <>
            <View {...props} onEventDelete={setEventId} />

            {eventId ? (
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

export default WithDeleteConfirmation;
