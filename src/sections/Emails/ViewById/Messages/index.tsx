import { useGetThreadQuery, useMarkThreadReadMutation } from "@/services/email";
import { useAuth } from "@/hooks/use-auth";
import getMessage from "./getMessage";
import { FC, useEffect, useLayoutEffect } from "react";
import { useFiltersContext } from "../../Filters/Context";

interface MessagesProps {
    threadId: string;
}

const Messages: FC<MessagesProps> = ({ threadId }) => {
    const { user } = useAuth();
    const { data } = useGetThreadQuery({ userId: user?.id!, threadId });
    const { messages } = data || {};

    const [markRead] = useMarkThreadReadMutation();
    useEffect(() => {
        markRead({
            userId: user?.id!,
            threadId,
        });
    }, [user?.id!, threadId]);

    const count = messages?.length ?? 0;

    return messages?.map(getMessage(count));
};

export default Messages;
