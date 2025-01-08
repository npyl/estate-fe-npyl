import { useGetConversationMessagesQuery } from "@/services/messages";
import { useSelectedConversationContext } from "../SelectedConversation";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const PAGE_SIZE = 5;

const UserChat = () => {
    const { conversationId } = useSelectedConversationContext();

    const [page, setPage] = useState(0);

    const { data } = useGetConversationMessagesQuery(
        {
            conversationId: conversationId!,
            pagination: {
                page,
                size: PAGE_SIZE,
            },
        },
        { skip: !conversationId }
    );

    const { hasMore } = data || {};

    return <Stack>{!hasMore ? <Typography>TELOS</Typography> : null}</Stack>;
};

export default UserChat;
