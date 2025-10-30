import { FC } from "react";
import { useToggleMessagesAccessMutation } from "@/services/user";
import ToggleButton from "./ToggleButton";
import { useTranslation } from "react-i18next";

interface ToggleMessagesProps {
    userId: number;
    enabled: boolean;
}

const ToggleMessages: FC<ToggleMessagesProps> = ({ userId, enabled }) => {
    const { t } = useTranslation();

    const [toggle, { isLoading }] = useToggleMessagesAccessMutation();

    return (
        <ToggleButton
            label={t("Messages")}
            userId={userId}
            enabled={enabled}
            loading={isLoading}
            toggleCb={toggle}
        />
    );
};

export default ToggleMessages;
