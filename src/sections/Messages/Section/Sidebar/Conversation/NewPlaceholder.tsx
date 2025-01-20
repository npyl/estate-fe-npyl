import Conversation from ".";
import { NEW_CONVERSATION_ID } from "../../constants";

const NewPlaceholder = () => (
    <Conversation
        c={{
            id: NEW_CONVERSATION_ID,
            participants: [],
            type: "DIRECT",
            lastMessage: {
                content: "",
                createdAt: "",
            },
            createdAt: "",
            updatedAt: "",
        }}
    />
);

export default NewPlaceholder;
