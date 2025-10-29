import { FC } from "react";
import { useToggleNotificationAccessMutation } from "@/services/user";
import ToggleButton from "./ToggleButton";

interface ToggleNotificationsProps {
    userId: number;
    notificationsEnabled: boolean;
}

const ToggleNotifications: FC<ToggleNotificationsProps> = ({
    userId,
    notificationsEnabled,
}) => {
    const [toggle, { isLoading }] = useToggleNotificationAccessMutation();

    return (
        <ToggleButton
            userId={userId}
            enabled={notificationsEnabled}
            loading={isLoading}
            toggleCb={toggle}
        />
    );
};

export default ToggleNotifications;
