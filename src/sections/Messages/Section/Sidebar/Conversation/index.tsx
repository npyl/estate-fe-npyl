import { getBorderColor2 } from "@/theme/borderColor";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useCallback } from "react";
import { SxProps, Theme } from "@mui/material";
import StatusIndicator from "./StatusIndicator";
import { useSelectedConversationContext } from "../../SelectedConversation";
import { IConversation } from "@/types/messages";
import UpdatedAt from "./UpdatedAt";
import Avatars from "./Avatars";
import Title from "./Title";

// ----------------------------------------------------------------------

const getBgColor = ({ palette: { mode, neutral } }: Theme) =>
    mode === "light" ? neutral?.[200] : neutral?.[800];

const getUserOptionSx = (selected: boolean): SxProps<Theme> => ({
    alignItems: "center",

    p: 1,

    borderBottom: "1px solid",
    borderColor: getBorderColor2,

    "&:hover": {
        bgcolor: getBgColor,
        cursor: "pointer",
    },

    ...(selected ? { bgcolor: getBgColor } : {}),

    "&:last-child": {
        border: "none",
    },
});

// ----------------------------------------------------------------------

interface UserOptionProps {
    c: IConversation;
}

const Conversation: FC<UserOptionProps> = ({ c }) => {
    const { conversationId, setConversationId } =
        useSelectedConversationContext();

    const isSelected = conversationId === c.id;

    const { id, participants, updatedAt } = c || {};

    const handleClick = useCallback(() => setConversationId(c?.id), []);

    return (
        <Stack
            width={1}
            direction="row"
            spacing={1}
            sx={getUserOptionSx(isSelected)}
            onClick={handleClick}
        >
            {/* INFO: width is approx. 120px */}
            <Avatars userIds={participants} />

            <Stack width="calc(90% - 130px)">
                <Title name={id} userIdsCount={5} userId0={participants?.[0]} />

                <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    textOverflow="ellipsis"
                    overflow="hidden"
                >
                    Το τελευταίο που έγραψε!
                </Typography>
            </Stack>
            <Stack width="10%" height={1} alignItems="end">
                <UpdatedAt date={updatedAt} />
                <StatusIndicator />
            </Stack>
        </Stack>
    );
};

export default Conversation;
