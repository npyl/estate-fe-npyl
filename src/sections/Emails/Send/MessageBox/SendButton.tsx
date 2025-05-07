import SendIcon from "@mui/icons-material/Send";
import { IconButton, IconButtonProps, SxProps, Theme } from "@mui/material";
import { FC } from "react";

const SendButtonSx: SxProps<Theme> = {
    position: "absolute",
    top: -50,
    right: 0,
    bgcolor: "background.paper",
    "&:hover": {
        bgcolor: "background.paper",
    },
};

const SendButton: FC<IconButtonProps> = ({ sx, ...props }) => (
    <IconButton color="primary" sx={{ ...SendButtonSx, ...sx }} {...props}>
        <SendIcon />
    </IconButton>
);

export default SendButton;
