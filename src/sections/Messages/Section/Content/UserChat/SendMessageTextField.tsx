import { FC, useCallback } from "react";
import TextField from "../_shared/TextField";
import useChatService from "../../Sidebar/useChatService";

interface SendMessageTextFieldProps {
    conversationId: string;
}

const SendMessageTextField: FC<SendMessageTextFieldProps> = ({
    conversationId,
}) => {
    const { sendMessage } = useChatService();

    const handleSend = useCallback(
        (content: string) =>
            sendMessage({ conversationId, type: "TEXT", content }),
        [conversationId]
    );

    return <TextField onSend={handleSend} />;
};

export default SendMessageTextField;
