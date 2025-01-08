import Stack, { StackProps } from "@mui/material/Stack";
import { FC } from "react";
import { useSelectedConversationContext } from "@/sections/Messages/Section/SelectedConversation";

const HideWithConversationStack: FC<StackProps> = ({ sx, ...props }) => {
    const { conversationId } = useSelectedConversationContext();
    return (
        <Stack
            sx={{
                display: {
                    xs: conversationId ? "none" : "block",
                    md: "block",
                },
                ...sx,
            }}
            {...props}
        />
    );
};

export default HideWithConversationStack;
