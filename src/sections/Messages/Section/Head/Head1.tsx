import Stack from "@mui/material/Stack";
import { HEAD_HEIGHT } from "../constants";
import { getBorderColor2 } from "@/theme/borderColor";
import { useSelectedConversationContext } from "../SelectedConversation";
import { useGetConversationsQuery } from "@/services/messages";
import { useMemo } from "react";
import Title from "@/sections/Messages/Section/Sidebar/Conversation/Title";
import Avatars from "../Sidebar/Conversation/Avatars";

const Content = () => {
    const { conversationId } = useSelectedConversationContext();
    const { data } = useGetConversationsQuery(undefined, {
        skip: !conversationId,
    });
    const conversation = useMemo(
        () => data?.find(({ id }) => id === conversationId),
        [conversationId, data]
    );

    const { id, participants } = conversation || {};

    return (
        <>
            <Avatars userIds={participants || []} />
            <Title name={id} userIdsCount={2} userId0={participants?.[0]} />
        </>
    );
};

const Head1 = () => (
    <Stack
        minHeight={HEAD_HEIGHT}
        height={HEAD_HEIGHT}
        maxHeight={HEAD_HEIGHT}
        borderBottom="1px solid"
        borderColor={getBorderColor2}
        direction="row"
        spacing={1}
        alignItems="center"
        px={1}
    >
        <Content />
    </Stack>
);
export default Head1;
