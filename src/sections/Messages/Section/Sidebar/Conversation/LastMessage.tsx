import useChatService, {
    EVENTS,
    TChatServiceInitCb,
} from "@/sections/Messages/useChatService";
import { IRealtimeMessage } from "@/types/messages";
import Typography from "@mui/material/Typography";
import { FC, useCallback, useState } from "react";

interface LastMessageProps {
    conversationId: string;
    content: string;
}

const LastMessage: FC<LastMessageProps> = ({ conversationId, content }) => {
    const [message, setMessage] = useState<string>();

    const onMessage = useCallback((m: IRealtimeMessage) => {
        const { conversationId: cid, content } = m;
        if (conversationId !== cid) return;

        setMessage(content);
    }, []);

    const initService: TChatServiceInitCb = useCallback(
        (applyListener, removeListener) => {
            applyListener(EVENTS.MESSAGE_RECEIVED, onMessage);
            return () => {
                removeListener(EVENTS.MESSAGE_RECEIVED, onMessage);
            };
        },
        []
    );

    useChatService(initService);

    return (
        <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            textOverflow="ellipsis"
            overflow="hidden"
        >
            {message || content}
        </Typography>
    );
};

export default LastMessage;
