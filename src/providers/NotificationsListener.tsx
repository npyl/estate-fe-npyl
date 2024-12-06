import useTasksNotifications from "@/hooks/useTasksNotifications";
import { useCallback } from "react";

const NotificationsListener = () => {
    const onTaskNotification = useCallback(() => {
        // ...
    }, []);

    useTasksNotifications({ onTaskNotification });

    return null;
};

export default NotificationsListener;
