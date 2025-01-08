import Stack from "@mui/material/Stack";
import { useSelectedConversationContext } from "../SelectedConversation";
import dynamic from "next/dynamic";
const NotSelectedPlaceholder = dynamic(
    () => import("./NotSelectedPlaceholder")
);
const UserChat = dynamic(() => import("./UserChat"));

const MessageContent = () => {
    const { conversationId } = useSelectedConversationContext();

    return (
        <Stack>
            {!conversationId ? <NotSelectedPlaceholder /> : null}
            {conversationId ? <UserChat /> : null}
        </Stack>
    );
};

export default MessageContent;
