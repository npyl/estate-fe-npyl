import { IMessageRes } from "@/types/messages";
import toNumberSafe from "@/utils/toNumberSafe";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import SenderAvatar from "./SenderAvatar";
import FullName from "./FullName";
import Content from "./Content";

interface MessageProps {
    m: IMessageRes;
    currentUserId: number;
}

const Message: FC<MessageProps> = ({ currentUserId, m }) => {
    const { sender, content, createdAt } = m;

    const iSender = toNumberSafe(sender);
    const isCurrentUser = iSender === currentUserId;
    const className = `message ${isCurrentUser ? "current-user" : ""}`;

    return (
        <Stack
            className={className}
            width="fit-content"
            maxWidth="50%"
            direction="row"
            spacing={1}
        >
            {!isCurrentUser ? <SenderAvatar userId={iSender} /> : null}
            <Stack>
                {!isCurrentUser ? <FullName userId={iSender} /> : null}

                <Content
                    currentUser={isCurrentUser}
                    content={content}
                    createdAt={createdAt}
                />
            </Stack>
        </Stack>
    );
};

export default Message;
