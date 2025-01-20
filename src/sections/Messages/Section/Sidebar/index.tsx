import Stack from "@mui/material/Stack";
import SidebarSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
import { IConversation } from "@/types/messages";
import useChatService from "@/sections/Messages/useChatService";
import { useGetConversationsQuery } from "@/services/messages";
import { useSelectedConversationContext } from "../SelectedConversation";
const NewPlaceholder = dynamic(() => import("./Conversation/NewPlaceholder"));
const Conversation = dynamic(() => import("./Conversation"));

// ----------------------------------------------------------------------

const getConversation = (c: IConversation) => <Conversation key={c.id} c={c} />;

// ----------------------------------------------------------------------

const MessageSidebar = () => {
    const { isConnected } = useChatService();

    const { data, isLoading } = useGetConversationsQuery(undefined, {
        skip: !isConnected,
    });

    const { isCreating } = useSelectedConversationContext();

    if (isLoading) return <SidebarSkeleton />;

    return (
        <Stack height={1} overflow="hidden auto">
            {isCreating ? <NewPlaceholder /> : null}
            {data?.map(getConversation)}
        </Stack>
    );
};

export default MessageSidebar;
