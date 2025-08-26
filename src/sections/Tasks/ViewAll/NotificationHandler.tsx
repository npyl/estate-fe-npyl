import useTasksNotifications from "@/ui/useTasksNotifications";
import { tasks } from "@/services/tasks";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const NotificationHandler = () => {
    const dispatch = useDispatch();

    /**
     * INFO: make sure we refresh the content when we have a new message
     * TODO: do not refetch + redraw the whole board
     */
    const onTaskNotification = useCallback(
        () => dispatch(tasks.util.invalidateTags(["Board"])),
        []
    );

    useTasksNotifications({ onTaskNotification });

    return null;
};

export default NotificationHandler;
