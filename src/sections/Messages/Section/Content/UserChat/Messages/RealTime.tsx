import { FC, useCallback, useState } from "react";
import useChatService from "../../../Sidebar/useChatService";
import { IMessageRes } from "@/types/messages";
import getMessage from "./getMessage";

interface Props {
    currentUserId: number;
}

const RealTimeMessages: FC<Props> = ({ currentUserId }) => {
    const [messages, setMessages] = useState<IMessageRes[]>([]);

    const onMessage = useCallback(
        (m: IMessageRes) => setMessages((old) => [...old, m]),
        []
    );

    useChatService({ onMessage });

    return <>{messages?.map(getMessage(currentUserId))}</>;
};

export default RealTimeMessages;
