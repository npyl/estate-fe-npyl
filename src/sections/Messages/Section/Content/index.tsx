import { useSelectedConversationContext } from "../SelectedConversation";
import dynamic from "next/dynamic";
const CreateConversation = dynamic(() => import("./CreateConversation"));
const NotSelectedPlaceholder = dynamic(
    () => import("./NotSelectedPlaceholder")
);
const UserChat = dynamic(() => import("./UserChat"));

const MessageContent = () => {
    const { conversationId, isCreating } = useSelectedConversationContext();

    return (
        <>
            {!conversationId ? <NotSelectedPlaceholder /> : null}

            {conversationId && !isCreating ? (
                <UserChat conversationId={conversationId} />
            ) : null}

            {isCreating ? <CreateConversation /> : null}
        </>
    );
};

export default MessageContent;
