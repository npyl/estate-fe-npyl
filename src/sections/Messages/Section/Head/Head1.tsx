import Stack from "@mui/material/Stack";
import { HEAD_HEIGHT } from "../constants";
import { getBorderColor2 } from "@/theme/borderColor";
import { useSelectedConversationContext } from "../SelectedConversation";
import { useGetConversationsQuery } from "@/services/messages";
import { useCallback, useMemo } from "react";
import Title from "@/sections/Messages/Section/Sidebar/Conversation/Title";
import Avatars from "../Sidebar/Conversation/Avatars";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const BackButton = () => {
    const { setConversationId } = useSelectedConversationContext();
    const handleClick = useCallback(() => setConversationId(""), []);
    return (
        <IconButton className="BackButton" onClick={handleClick}>
            <ChevronLeftIcon />
        </IconButton>
    );
};

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

    if (!conversationId) return null;

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
        sx={{
            ".BackButton": {
                display: {
                    xs: "block",
                    md: "none",
                },
            },
        }}
    >
        <BackButton />
        <Content />
    </Stack>
);
export default Head1;
