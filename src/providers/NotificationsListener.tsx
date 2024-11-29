import useNotificationsSocket from "@/hooks/useTasksNotifications";
import { useCallback } from "react";

const NotificationsListener = () => {
    const onTaskNotification = useCallback(() => {
        // ...
    }, []);

    useNotificationsSocket({ onTaskNotification });

    return null;
};

export default NotificationsListener;
