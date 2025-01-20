import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useSelectedConversationContext } from "../../SelectedConversation";
import { SxProps, Theme } from "@mui/material";
import { FC } from "react";

const getButtonSx = (isCreating: boolean): SxProps<Theme> => ({
    borderRadius: "100%",

    display: {
        xs: "flex",
        md: isCreating ? "flex" : "none",
    },
});

const BackButton: FC<IconButtonProps> = (props) => {
    const { isCreating, clearConversationId } =
        useSelectedConversationContext();

    return (
        <IconButton
            className="BackButton"
            onClick={clearConversationId}
            sx={getButtonSx(isCreating)}
            {...props}
        >
            <ChevronLeftIcon />
        </IconButton>
    );
};

export default BackButton;
