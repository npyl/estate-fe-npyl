import { useCallback } from "react";
import { useDeleteEventMutation } from "@/services/calendar";
import { useAuth } from "@/hooks/use-auth";

const useEventMutations = () => {
    const { user } = useAuth();

    const [deleteEventCb] = useDeleteEventMutation();

    const editEvent = () => {};

    const deleteEvent = useCallback(
        (eventId: string) =>
            deleteEventCb({
                userId: user?.id!,
                eventId,
            }),
        []
    );

    return {
        editEvent,
        deleteEvent,
    };
};

export default useEventMutations;
