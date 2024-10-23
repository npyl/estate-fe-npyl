import { useCallback } from "react";
import {
    useCreateEventMutation,
    useDeleteEventMutation,
    useUpdateEventMutation,
} from "@/services/calendar";
import { useAuth } from "@/hooks/use-auth";
import { CalendarEventReq } from "@/types/calendar";

const useEventMutations = () => {
    const { user } = useAuth();

    const [createEventCb] = useCreateEventMutation();
    const [updateEventCb] = useUpdateEventMutation();
    const [deleteEventCb] = useDeleteEventMutation();

    const createEvent = useCallback(
        (body: CalendarEventReq) =>
            createEventCb({
                userId: user?.id!,
                body,
            }),
        []
    );
    const editEvent = useCallback(
        (body: CalendarEventReq) =>
            updateEventCb({
                userId: user?.id!,
                body,
            }),
        []
    );
    const deleteEvent = useCallback(
        (eventId: string) =>
            deleteEventCb({
                userId: user?.id!,
                eventId,
            }),
        []
    );

    return {
        createEvent,
        editEvent,
        deleteEvent,
    };
};

export default useEventMutations;
