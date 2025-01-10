import { useCallback } from "react";
import TextField from "../_shared/TextField";
import { useInitiateConversationMutation } from "@/services/messages";
import { useCreateConversationContext } from "../../CreateConversation";
import { useSelectedConversationContext } from "../../SelectedConversation";
import Stack from "@mui/material/Stack";
import { HEAD_HEIGHT } from "../../constants";

const CreateConversation = () => {
    const { setConversationId } = useSelectedConversationContext();

    const { recipients } = useCreateConversationContext();
    const recipientId = recipients?.[0];

    const [initiate] = useInitiateConversationMutation();

    const handleSend = useCallback(
        async (message: string) => {
            if (recipientId === undefined) return;

            const { id } = await initiate({
                recipientId: recipientId.toString(),
                message,
            }).unwrap();

            if (!id) return;

            setConversationId(id);
        },
        [recipientId]
    );

    return (
        <Stack height={`calc(100% - ${HEAD_HEIGHT})`}>
            <Stack flexGrow={1} />
            <TextField onSend={handleSend} />
        </Stack>
    );
};

export default CreateConversation;
