import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useSelectedConversationContext } from "../../SelectedConversation";

const BackButton = () => {
    const { clearConversationId } = useSelectedConversationContext();
    return (
        <IconButton className="BackButton" onClick={clearConversationId}>
            <ChevronLeftIcon />
        </IconButton>
    );
};

export default BackButton;
