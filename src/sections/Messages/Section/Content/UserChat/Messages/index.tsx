import { useAuth } from "@/hooks/use-auth";
import { useGetConversationMessagesQuery } from "@/services/messages";
import { IMessageRes } from "@/types/messages";
import { SxProps, Theme } from "@mui/material";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import { FC, useRef } from "react";
const Message = dynamic(() => import("./Message"));

// -----------------------------------------------------------------------

const getMessage = (currentUserId: number) => (m: IMessageRes) =>
    <Message key={m.id} currentUserId={currentUserId} m={m} />;

// -----------------------------------------------------------------------

const hideConsecutiveMessageMeta = {
    ".pp-message-avatar, .pp-message-fullname": {
        display: "none",
    },

    ml: "40px",
};

const bubbleRadiusStyles = {
    consecutive: {
        ".pp-text-align-left": {
            borderTopLeftRadius: "5px",
            borderBottomLeftRadius: "5px",
        },
        ".pp-text-align-right": {
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
        },
    },
    firstInSequence: {
        ".pp-text-align-left": {
            borderBottomLeftRadius: "5px",
        },
        ".pp-text-align-right": {
            borderBottomRightRadius: "5px",
        },
    },
    lastInSequence: {
        ".pp-text-align-left": {
            borderBottomLeftRadius: "16px",
        },
        ".pp-text-align-right": {
            borderBottomRightRadius: "16px",
        },
    },
};

const ContainerSx: SxProps<Theme> = {
    '& [class*="pp-message-sender-"] + [class*="pp-message-sender-"]': {
        ...hideConsecutiveMessageMeta,
        ...bubbleRadiusStyles.consecutive,
    },
    '& [class*="pp-message-sender-"]:has(+ [class*="pp-message-sender-"])':
        bubbleRadiusStyles.firstInSequence,
    '& [class*="pp-message-sender-"] + [class*="pp-message-sender-"]:not(:has(+ [class*="pp-message-sender-"]))':
        bubbleRadiusStyles.lastInSequence,
};

const PAGE_SIZE = 15;

interface MessagesProps {
    conversationId: string;
}

const Messages: FC<MessagesProps> = ({ conversationId }) => {
    const { user } = useAuth();

    const page = useRef(0);

    const { data, isLoading } = useGetConversationMessagesQuery({
        conversationId,
        pagination: {
            page: page.current,
            size: PAGE_SIZE,
        },
    });

    const { hasMore, messages } = data || {};

    return (
        <Stack
            overflow="hidden auto"
            p={1}
            height={1}
            spacing={0.15}
            sx={ContainerSx}
        >
            {messages?.map(getMessage(user?.id!))}
        </Stack>
    );
};

export default Messages;
