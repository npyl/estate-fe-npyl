import { useGetConversationMessagesQuery } from "@/services/messages";
import { FC, useRef } from "react";
import TextField from "../_shared/TextField";
import Stack from "@mui/material/Stack";
import Messages from "./Messages";
import { HEAD_HEIGHT } from "../../constants";

const PAGE_SIZE = 5;

interface UserChatProps {
    conversationId: string;
}

const UserChat: FC<UserChatProps> = ({ conversationId }) => {
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
        <Stack height={`calc(100% - ${HEAD_HEIGHT})`}>
            <Messages messages={messages} />
            <Stack flexGrow={1} />
            <TextField onSend={() => {}} />
        </Stack>
    );
};

export default UserChat;
