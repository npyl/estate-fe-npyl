import Avatar from "@/components/Avatar";
import { useAuth } from "@/hooks/use-auth";
import { useGetUserQuery } from "@/services/user";
import { IMessageRes } from "@/types/messages";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";

// -----------------------------------------------------------------------

interface FullNameProps {
    userId: number;
}

const FullName: FC<FullNameProps> = ({ userId }) => {
    const { data, isLoading } = useGetUserQuery(userId);
    const { firstName, lastName } = data || {};
    const fullname = `${firstName || ""} ${lastName || ""}`;

    if (isLoading)
        return <Skeleton variant="text" height="30px" width="120px" />;

    return (
        <Typography
            className="pp-message-fullname"
            variant="body2"
            fontWeight="bold"
            mb={0.3}
        >
            {"AAAA"}
        </Typography>
    );
};

// -----------------------------------------------------------------------

interface SenderAvatarProps {
    userId: number;
}

const SenderAvatar: FC<SenderAvatarProps> = ({ userId }) => {
    const { data, isLoading } = useGetUserQuery(userId);
    const { avatar, firstName, lastName } = data || {};
    if (isLoading) return <Skeleton variant="circular" />;
    return (
        <Avatar
            className="pp-message-avatar"
            src={avatar}
            firstName={firstName}
            lastName={lastName}
        />
    );
};

// -----------------------------------------------------------------------
interface MessageProps {
    m: IMessageRes;
    currentUserId: number;
}

const Message: FC<MessageProps> = ({ currentUserId, m }) => {
    const { sender, content } = m;

    const className = `pp-message-${sender}`;
    const bgcolor = sender === currentUserId ? "primary.main" : "neutral.200";
    const alignSelf = sender === currentUserId ? "flex-end" : "normal";

    return (
        <Stack
            className={className}
            width="fit-content"
            maxWidth="50%"
            direction="row"
            spacing={1}
            alignSelf={alignSelf}
        >
            <SenderAvatar userId={sender} />
            <Stack>
                <FullName userId={sender} />
                <Typography p={1} bgcolor={bgcolor} borderRadius="16px">
                    {content}
                </Typography>
            </Stack>
        </Stack>
    );
};

// -----------------------------------------------------------------------

const getMessage = (currentUserId: number) => (m: IMessageRes) =>
    <Message key={m.id} currentUserId={currentUserId} m={m} />;

// -----------------------------------------------------------------------

interface MessagesProps {
    messages?: IMessageRes[];
}

const Messages: FC<MessagesProps> = ({ messages }) => {
    const { user } = useAuth();
    return (
        <Stack
            overflow="hidden auto"
            p={1}
            sx={{
                // When a message with class pp-message-X is followed by another message with the same class,
                // hide the avatar and fullname of the second message
                // Target any message class that starts with pp-message- followed by the same sender ID
                // Use a more specific selector to target consecutive messages from the same sender
                '& [class*="pp-message-"] + [class*="pp-message-"]': {
                    ".pp-message-avatar, .pp-message-fullname": {
                        display: "none",
                    },

                    ml: "40px",
                },
            }}
        >
            {messages?.map(getMessage(user?.id!))}
        </Stack>
    );
};

export default Messages;
