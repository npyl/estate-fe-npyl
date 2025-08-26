import useTasksNotifications from "@/sections/Notification/hook/useTasksNotifications";
import onTaskNotification from "@/sections/Tasks/toast";

const NotificationsListener = () => {
    useTasksNotifications({ onTaskNotification });
    return null;
};

export default NotificationsListener;
