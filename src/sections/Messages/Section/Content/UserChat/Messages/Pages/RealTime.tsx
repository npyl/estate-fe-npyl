import { FC } from "react";
import useChatService, {
    EVENTS,
    useApplyListener,
} from "@/sections/Messages/useChatService";
import { IMessageRes } from "@/types/messages";

interface Props {
    onMessage: (m: IMessageRes) => void;
}

const RealTimeMessages: FC<Props> = ({ onMessage }) => {
    const { socket } = useChatService();
    useApplyListener(socket, EVENTS.MESSAGE_RECEIVED, onMessage);
    return null;
};

export default RealTimeMessages;
