import { useCallback } from "react";
import TextField from "../_shared/TextField";
import { useInitiateConversationMutation } from "@/services/messages";
import { useCreateConversationContext } from "../../CreateConversation";
import { useSelectedConversationContext } from "../../SelectedConversation";
import Stack from "@mui/material/Stack";
import { HEAD_HEIGHT } from "../../constants";

const tenantId = process.env.NEXT_PUBLIC_MESSAGES_TID || "";

const CreateConversation = () => {
    const { setConversationId } = useSelectedConversationContext();
    const { recipients } = useCreateConversationContext();

    const [initiate] = useInitiateConversationMutation();

    const handleSend = useCallback(
        async (v: string) => {
            const recipientId = recipients?.[0];
            if (recipientId === undefined) return;

            const { id } = await initiate({
                tenantId,
                recipientId: recipientId.toString(),

                // TODO: also pass message
            }).unwrap();

            if (!id) return;

            setConversationId(id);
        },
        [recipients]
    );

    return (
        <Stack height={`calc(100% - ${HEAD_HEIGHT})`}>
            <Stack flexGrow={1} />
            <TextField onSend={handleSend} />
        </Stack>
    );
};

export default CreateConversation;
