import { useAuth } from "@/hooks/use-auth";
import { useGetConversationMessagesQuery } from "@/services/messages";
import { IMessageRes } from "@/types/messages";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import { FC, useRef } from "react";
const Message = dynamic(() => import("./Message"));

// -----------------------------------------------------------------------

const getMessage = (currentUserId: number) => (m: IMessageRes) =>
    <Message key={m.id} currentUserId={currentUserId} m={m} />;

// -----------------------------------------------------------------------

const PAGE_SIZE = 5;

interface MessagesProps {
    conversationId: string;
}

const Messages: FC<MessagesProps> = ({ conversationId }) => {
    const { user } = useAuth();

    const page = useRef(0);

    const { data, isLoading } = useGetConversationMessagesQuery({
        conversationId,
        pagination: {
            page: page.current,
            size: PAGE_SIZE,
        },
    });

    const { hasMore, messages } = data || {};

    return (
        <Stack
            overflow="hidden auto"
            p={1}
            sx={{
                // When a message with class pp-message-X is followed by another message with the same class,
                // hide the avatar and fullname of the second message
                // Target any message class that starts with pp-message- followed by the same sender ID
                // Use a more specific selector to target consecutive messages from the same sender
                '& [class*="pp-message-"] + [class*="pp-message-"]': {
                    ".pp-message-avatar, .pp-message-fullname": {
                        display: "none",
                    },

                    ml: "40px",
                },
            }}
        >
            {messages?.map(getMessage(user?.id!))}
        </Stack>
    );
};

export default Messages;
