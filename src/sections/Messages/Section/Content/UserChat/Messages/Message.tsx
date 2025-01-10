import { IMessageRes } from "@/types/messages";
import { toNumberSafe } from "@/utils/toNumber";
import { SxProps, Theme } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import SenderAvatar from "./SenderAvatar";
import FullName from "./FullName";

const getTextSx = (isCurrentUser: boolean): SxProps<Theme> =>
    isCurrentUser
        ? {
              bgcolor: "primary.main",
              color: ({ palette: { mode } }) =>
                  mode === "light" ? "white" : "neutral.200",
          }
        : {
              bgcolor: ({ palette: { mode } }) =>
                  mode === "light" ? "neutral.200" : "neutral.700",
          };

interface MessageProps {
    m: IMessageRes;
    currentUserId: number;
}

const Message: FC<MessageProps> = ({ currentUserId, m }) => {
    const { sender, content } = m;

    const className = `pp-message-${sender}`;

    const iSender = toNumberSafe(sender);
    const isCurrentUser = iSender === currentUserId;
    const alignSelf = isCurrentUser ? "flex-end" : "normal";

    const textClassName = `pp-text-align-${isCurrentUser ? "right" : "left"}`;

    return (
        <Stack
            className={className}
            width="fit-content"
            maxWidth="50%"
            direction="row"
            spacing={1}
            alignSelf={alignSelf}
        >
            {!isCurrentUser ? <SenderAvatar userId={iSender} /> : null}
            <Stack>
                {!isCurrentUser ? <FullName userId={iSender} /> : null}

                <Typography
                    className={textClassName}
                    p={1}
                    borderRadius="16px"
                    sx={getTextSx(isCurrentUser)}
                >
                    {content}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default Message;
