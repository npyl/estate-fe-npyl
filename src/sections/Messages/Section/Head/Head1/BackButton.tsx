import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useSelectedConversationContext } from "../../SelectedConversation";
import { SxProps, Theme } from "@mui/material";
import { FC } from "react";

const ButtonSx: SxProps<Theme> = {
    borderRadius: "100%",
};

const BackButton: FC<IconButtonProps> = (props) => {
    const { clearConversationId } = useSelectedConversationContext();
    return (
        <IconButton
            className="BackButton"
            onClick={clearConversationId}
            sx={ButtonSx}
            {...props}
        >
            <ChevronLeftIcon />
        </IconButton>
    );
};

export default BackButton;
