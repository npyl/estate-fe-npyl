import { useAuth } from "@/hooks/use-auth";
import { SxProps, Theme } from "@mui/material";
import { FC } from "react";
import RealTimeMessages from "./RealTime";
import StickyScroll from "./StickyScroll";
import Pages from "./Pages";

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

interface MessagesProps {
    conversationId: string;
}

const Messages: FC<MessagesProps> = ({ conversationId }) => {
    const { user } = useAuth();

    return (
        <StickyScroll p={1} height={1} spacing={0.15} sx={ContainerSx}>
            <Pages currentUserId={user?.id!} conversationId={conversationId} />
            <RealTimeMessages currentUserId={user?.id!} />
        </StickyScroll>
    );
};

export default Messages;
