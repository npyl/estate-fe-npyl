import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useSelectedConversationContext } from "../../SelectedConversation";
import { SxProps, Theme } from "@mui/material";

const ButtonSx: SxProps<Theme> = {
    borderRadius: "100%",
};

const BackButton = () => {
    const { clearConversationId } = useSelectedConversationContext();
    return (
        <IconButton
            className="BackButton"
            onClick={clearConversationId}
            sx={ButtonSx}
        >
            <ChevronLeftIcon />
        </IconButton>
    );
};

export default BackButton;
