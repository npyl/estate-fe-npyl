import { useSendMessageToConversationMutation } from "@/services/messages";
import { FC, useCallback } from "react";
import TextField from "../_shared/TextField";

interface SendMessageTextFieldProps {
    conversationId: string;
}

const SendMessageTextField: FC<SendMessageTextFieldProps> = ({
    conversationId,
}) => {
    const [sendMessage] = useSendMessageToConversationMutation();
    const handleSend = useCallback(
        (content: string) =>
            sendMessage({ conversationId, type: "TEXT", content }),
        [conversationId]
    );

    return <TextField onSend={handleSend} />;
};

export default SendMessageTextField;
