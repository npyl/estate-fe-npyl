import Typography from "@mui/material/Typography";
import { FC } from "react";

interface LastMessageProps {
    content: string;
}

const LastMessage: FC<LastMessageProps> = ({ content }) => (
    <Typography
        variant="body2"
        color="text.secondary"
        noWrap
        textOverflow="ellipsis"
        overflow="hidden"
    >
        {content}
    </Typography>
);

export default LastMessage;
