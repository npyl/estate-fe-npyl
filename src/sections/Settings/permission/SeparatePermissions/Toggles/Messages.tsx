import { FC } from "react";
import { useToggleMessagesAccessMutation } from "@/services/user";
import ToggleButton from "./ToggleButton";

interface ToggleMessagesProps {
    userId: number;
    enabled: boolean;
}

const ToggleMessages: FC<ToggleMessagesProps> = ({ userId, enabled }) => {
    const [toggle, { isLoading }] = useToggleMessagesAccessMutation();

    return (
        <ToggleButton
            userId={userId}
            enabled={enabled}
            loading={isLoading}
            toggleCb={toggle}
        />
    );
};

export default ToggleMessages;
