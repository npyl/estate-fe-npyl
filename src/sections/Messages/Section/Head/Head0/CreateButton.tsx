import IconButton from "@mui/material/IconButton";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useSelectedConversationContext } from "../../SelectedConversation";

const CreateButton = () => {
    const { isCreating, startCreating } = useSelectedConversationContext();

    return (
        <>
            <IconButton
                disabled={isCreating}
                sx={{ visibility: isCreating ? "hidden" : "visible" }}
                onClick={startCreating}
            >
                <AddCommentIcon />
            </IconButton>
        </>
    );
};

export default CreateButton;
