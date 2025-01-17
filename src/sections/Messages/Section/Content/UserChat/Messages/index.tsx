import { FC } from "react";
import StickyScroll from "./StickyScroll";
import Pages from "./Pages";
import { SxProps, Theme } from "@mui/material";

const ContainerSx: SxProps<Theme> = {
    // Remove default margins
    "& > *": { margin: "0 !important" },

    gap: 0.2,
    p: 2,

    "& .message": {
        alignSelf: "flex-start",
    },

    // Current user messages base styles
    "& .message.current-user": {
        alignSelf: "flex-end",

        // Default full rounded corners (for single messages)
        ".pp-message-content": {
            borderRadius: "20px",
        },

        // First in group
        "&:has(+ .message.current-user)": {
            ".pp-message-content": {
                borderRadius: "20px 20px 4px 20px",
            },
        },

        // Middle messages
        "& + .message.current-user": {
            ".pp-message-avatar, .pp-message-fullname": {
                display: "none",
            },

            ".pp-message-content": {
                borderRadius: "20px 4px 4px 20px",
            },
        },

        // Last message in group
        "&:not(:has(+ .message.current-user))": {
            ".pp-message-content": {
                borderRadius: "20px 4px 20px 20px",
            },
        },
    },

    // Other users' messages grouping
    "& .message:not(.current-user)": {
        // Default full rounded corners (for single messages)
        ".pp-message-content": {
            borderRadius: "20px",
        },

        // First in group
        "&:has(+ .message:not(.current-user))": {
            ".pp-message-content": {
                borderRadius: "20px 20px 20px 4px",
            },
        },

        // Middle messages
        "& + .message:not(.current-user)": {
            ".pp-message-avatar, .pp-message-fullname": {
                display: "none",
            },

            pl: "40px",

            ".pp-message-content": {
                borderRadius: "4px 20px 20px 4px",
            },
        },

        // Last message in group
        "&:not(:has(+ .message:not(.current-user)))": {
            ".pp-message-content": {
                borderRadius: "4px 20px 20px 20px",
            },
        },
    },
};

interface MessagesProps {
    conversationId: string;
}

const Messages: FC<MessagesProps> = ({ conversationId }) => (
    <StickyScroll p={1} height={1} spacing={0.15} sx={ContainerSx}>
        <Pages conversationId={conversationId} />
    </StickyScroll>
);

export default Messages;
