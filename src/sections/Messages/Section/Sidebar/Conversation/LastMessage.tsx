import { useGetConversationMessagesQuery } from "@/services/messages";
import Typography from "@mui/material/Typography";
import { FC } from "react";

interface LastMessageProps {
    conversationId: string;
}

const LastMessage: FC<LastMessageProps> = ({ conversationId }) => {
    const { data } = useGetConversationMessagesQuery({
        conversationId,
        pagination: {
            page: 0,
            size: 15,
        },
    });

    const lastMessage = data?.messages?.at(-1)?.content || "";

    return (
        <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            textOverflow="ellipsis"
            overflow="hidden"
        >
            {lastMessage}
        </Typography>
    );
};

export default LastMessage;
