import { FC } from "react";
import Stack from "@mui/material/Stack";
import Messages from "./Messages";
import { HEAD_HEIGHT } from "../../constants";
import SendMessageTextField from "./SendMessageTextField";

interface UserChatProps {
    conversationId: string;
}

const UserChat: FC<UserChatProps> = ({ conversationId }) => (
    <Stack height={`calc(100% - ${HEAD_HEIGHT})`}>
        <Messages conversationId={conversationId} />
        <Stack flexGrow={1} />
        <SendMessageTextField conversationId={conversationId} />
    </Stack>
);

export default UserChat;
