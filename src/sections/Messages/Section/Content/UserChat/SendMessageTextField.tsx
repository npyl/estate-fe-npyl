import { ChangeEvent, FC, useCallback } from "react";
import TextField from "../_shared/TextField";
import useChatService from "@/sections/Messages/useChatService";

interface SendMessageTextFieldProps {
    conversationId: string;
}

const SendMessageTextField: FC<SendMessageTextFieldProps> = ({
    conversationId,
}) => {
    const {
        sendMessage,
        // ...
        sendStartedTyping,
        sendStoppedTyping,
    } = useChatService();

    // ---------------------------------------------------------------

    const handleSend = useCallback(
        (content: string) =>
            sendMessage({ conversationId, type: "TEXT", content }),
        [conversationId]
    );

    const handleStartTyping = useCallback(
        () => sendStartedTyping(conversationId),
        [conversationId]
    );
    const handleStopTyping = useCallback(
        () => sendStoppedTyping(conversationId),
        [conversationId]
    );

    // ---------------------------------------------------------------

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const v = e.target.value;

            if (!v) {
                handleStopTyping();
            } else {
                handleStartTyping();
            }
        },
        [handleStartTyping, handleStopTyping]
    );

    return (
        <TextField
            onChange={handleChange}
            onEmptied={handleStopTyping}
            onSend={handleSend}
        />
    );
};

export default SendMessageTextField;
