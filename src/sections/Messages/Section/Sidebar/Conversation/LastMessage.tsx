import useChatService, {
    EVENTS,
    TChatServiceInitCb,
} from "@/sections/Messages/useChatService";
import { IMessageRes } from "@/types/messages";
import Typography from "@mui/material/Typography";
import { FC, useCallback, useState } from "react";

interface LastMessageProps {
    content: string;
}

const LastMessage: FC<LastMessageProps> = ({ content }) => {
    const [message, setMessage] = useState<string>();

    const onMessage = (m: IMessageRes) => setMessage(m.content);

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
