import {
    CalendarDayViewProps,
    CalendarMonthViewProps,
    CalendarWeekViewProps,
    CalendarYearViewProps,
} from "@/components/Calendar/types";
import useEventMutations from "./useEventMutations";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, useState } from "react";
const ConfirmDialog = dynamic(() => import("@/components/confirm-dialog"));

type AnyCalendarViewProps =
    | CalendarDayViewProps
    | CalendarWeekViewProps
    | CalendarMonthViewProps
    | CalendarYearViewProps;

type AnyCalendarView = ComponentType<AnyCalendarViewProps>;

const WithDeleteConfirmation = (View: AnyCalendarView) => {
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
                    title=""
                    action={<Button onClick={handleDelete}>Delete</Button>}
                    onClose={closeConfirm}
                />
            ) : null}
        </>
    );
};

export default WithDeleteConfirmation;
