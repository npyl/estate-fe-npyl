import useTasksNotifications from "@/hooks/useTasksNotifications";
import onTaskNotification from "@/sections/Tasks/toast";

const NotificationsListener = () => {
    useTasksNotifications({ onTaskNotification });
    return null;
};

export default NotificationsListener;
