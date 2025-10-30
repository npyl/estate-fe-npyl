import { FC } from "react";
import { useToggleNotificationAccessMutation } from "@/services/user";
import ToggleButton from "./ToggleButton";
import { useTranslation } from "react-i18next";

interface ToggleNotificationsProps {
    userId: number;
    notificationsEnabled: boolean;
}

const ToggleNotifications: FC<ToggleNotificationsProps> = ({
    userId,
    notificationsEnabled,
}) => {
    const { t } = useTranslation();

    const [toggle, { isLoading }] = useToggleNotificationAccessMutation();

    return (
        <ToggleButton
            label={t("Notifications")}
            userId={userId}
            enabled={notificationsEnabled}
            loading={isLoading}
            toggleCb={toggle}
        />
    );
};

export default ToggleNotifications;
