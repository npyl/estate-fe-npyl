import Conversation from ".";
import { NEW_CONVERSATION_ID } from "../../constants";

const NewPlaceholder = () => (
    <Conversation
        c={{
            id: NEW_CONVERSATION_ID,
            participants: [],
            type: "DIRECT",
            createdAt: "",
            updatedAt: "",
        }}
    />
);

export default NewPlaceholder;
