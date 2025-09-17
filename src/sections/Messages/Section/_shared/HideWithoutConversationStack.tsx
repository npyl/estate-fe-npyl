import { FC } from "react";
import { useSelectedConversationContext } from "@/sections/Messages/Section/SelectedConversation";
import StyledStack, { StyledStackProps } from "./StyledStack";

const HideWithoutConversationStack: FC<StyledStackProps> = ({
    sx,
    ...props
}) => {
    const { conversationId } = useSelectedConversationContext();
    return (
        <StyledStack
            sx={{
                display: {
                    xs: !conversationId ? "none" : "block",
                    md: "block",
                },
                ...sx,
            }}
            {...props}
        />
    );
};

export default HideWithoutConversationStack;
