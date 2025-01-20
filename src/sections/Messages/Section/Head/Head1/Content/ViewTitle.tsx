import { useGetConversationsQuery } from "@/services/messages";
import { FC, useMemo } from "react";
import Avatars from "../../../Sidebar/Conversation/Avatars";
import Title from "../../../Sidebar/Conversation/Title";

interface ViewTitleProps {
    conversationId: string;
}

const ViewTitle: FC<ViewTitleProps> = ({ conversationId }) => {
    const { data, isLoading } = useGetConversationsQuery(undefined, {
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
            <Title
                name={id}
                userIdsCount={participants?.length ?? 1}
                userId0={participants?.[0]}
            />
        </>
    );
};

export default ViewTitle;
