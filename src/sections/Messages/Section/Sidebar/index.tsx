import Stack from "@mui/material/Stack";
import SidebarSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
import { IConversation } from "@/types/messages";
import useChatService from "./useChatService";
import { useGetConversationsQuery } from "@/services/messages";
const Conversation = dynamic(() => import("./Conversation"));

// ----------------------------------------------------------------------

const getConversation = (c: IConversation) => <Conversation key={c.id} c={c} />;

// ----------------------------------------------------------------------

const MessageSidebar = () => {
    const { isConnected } = useChatService();

    const { data, isLoading } = useGetConversationsQuery(undefined, {
        skip: !isConnected,
    });

    return (
        <Stack height={1} overflow="hidden auto">
            {isLoading ? <SidebarSkeleton /> : null}
            {data?.map(getConversation)}
        </Stack>
    );
};

export default MessageSidebar;
