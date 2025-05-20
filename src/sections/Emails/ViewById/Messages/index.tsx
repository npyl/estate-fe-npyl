import { useGetThreadQuery } from "@/services/email";
import { useAuth } from "@/hooks/use-auth";
import getMessage from "./getMessage";
import { FC } from "react";

interface MessagesProps {
    threadId: string;
}

const Messages: FC<MessagesProps> = ({ threadId }) => {
    const { user } = useAuth();
    const { data } = useGetThreadQuery({ userId: user?.id!, threadId });
    const { messages } = data || {};

    const count = messages?.length ?? 0;

    return messages?.map(getMessage(count));
};

export default Messages;
