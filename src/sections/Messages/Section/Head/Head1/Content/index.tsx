import { useSelectedConversationContext } from "../../../SelectedConversation";
import CreateTitle from "./CreateTitle";
import ViewTitle from "./ViewTitle";

const Content = () => {
    const { conversationId, isCreating } = useSelectedConversationContext();

    if (!conversationId) return null;

    if (conversationId && isCreating) return <CreateTitle />;

    return <ViewTitle conversationId={conversationId} />;
};

export default Content;
