import { useGetThreadQuery } from "@/services/email";
import { useAuth } from "@/hooks/use-auth";
import Stack from "@mui/material/Stack";
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

    return (
        <Stack
            spacing={1}
            overflow="hidden auto"
            // TODO: hope we can get these calculated somehow one day!
            height={{
                xs: "calc(100vh - 220px)",
                lg: "calc(100vh - 260px)",
            }}
        >
            {messages?.map(getMessage(count))}
        </Stack>
    );
};

export default Messages;
