import { ChangeEvent, FC, useCallback } from "react";
import TextField from "../_shared/TextField";
import useChatService, {
    TChatServiceInitCb,
} from "@/sections/Messages/useChatService";

interface SendMessageTextFieldProps {
    conversationId: string;
}

const SendMessageTextField: FC<SendMessageTextFieldProps> = ({
    conversationId,
}) => {
    const serviceInit: TChatServiceInitCb = useCallback(() => {
        return () => {
            // INFO: make sure we notify the conversation that we stopped typing on unmount (a.k.a route/conversation change)
            handleStopTyping();
        };
    }, []);

    const {
        sendMessage,
        // ...
        sendStartedTyping,
        sendStoppedTyping,
    } = useChatService(serviceInit);

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
                // INFO: prevent re-sending a typing:start event after the first character written!
                if (e.target.value.length > 1) return;

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
