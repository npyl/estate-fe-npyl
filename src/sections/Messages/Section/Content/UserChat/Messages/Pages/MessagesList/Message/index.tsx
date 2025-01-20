import { IMessageRes } from "@/types/messages";
import { toNumberSafe } from "@/utils/toNumber";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import SenderAvatar from "./SenderAvatar";
import FullName from "./FullName";
import { SxProps, Theme } from "@mui/material/styles";

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

    const iSender = toNumberSafe(sender);
    const isCurrentUser = iSender === currentUserId;
    const className = `message ${isCurrentUser ? "current-user" : ""}`;

    return (
        <Stack
            className={className}
            width="fit-content"
            maxWidth="50%"
            direction="row"
            spacing={1}
        >
            {!isCurrentUser ? <SenderAvatar userId={iSender} /> : null}
            <Stack>
                {!isCurrentUser ? <FullName userId={iSender} /> : null}

                <Typography
                    className="pp-message-content"
                    p={1}
                    borderRadius="16px"
                    sx={{
                        // INFO: make sure the content breaks if not fitting
                        whiteSpace: "wrap",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        ...getTextSx(isCurrentUser),
                    }}
                >
                    {content}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default Message;
