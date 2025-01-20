import { FC, useCallback } from "react";
import useChatService, {
    EVENTS,
    TChatServiceInitCb,
} from "@/sections/Messages/useChatService";
import { IRealtimeMessage } from "@/types/messages";

interface Props {
    onMessage: (m: IRealtimeMessage) => void;
}

const RealTimeMessages: FC<Props> = ({ onMessage }) => {
    const serviceInit: TChatServiceInitCb = useCallback(
        (applyListener, removeListener) => {
            applyListener(EVENTS.MESSAGE_RECEIVED, onMessage);
            return () => {
                removeListener(EVENTS.MESSAGE_RECEIVED, onMessage);
            };
        },
        []
    );

    useChatService(serviceInit);

    return null;
};

export default RealTimeMessages;
