import { getBorderColor2 } from "@/theme/borderColor";
import Stack from "@mui/material/Stack";
import { FC, PropsWithChildren, useCallback } from "react";
import { SxProps, Theme } from "@mui/material";
import StatusIndicator from "./StatusIndicator";
import { useSelectedConversationContext } from "../../SelectedConversation";
import { IConversation } from "@/types/messages";
import UpdatedAt from "./UpdatedAt";
import Title from "./Title";
import LastMessage from "./LastMessage";
import { CONVERSATION_IMAGE_WIDTH } from "./constants";
import { NEW_CONVERSATION_ID } from "../../constants";
import Avatars from "./Avatars";
import MessageIcon from "@mui/icons-material/Message";

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

const END_WIDTH = "64px";

const CreateContentDummy = () => (
    <Stack
        width={CONVERSATION_IMAGE_WIDTH}
        height={1}
        justifyContent="center"
        alignItems="center"
    >
        <MessageIcon />
    </Stack>
);

interface ContentProps {
    c: IConversation;
}

const Content: FC<ContentProps> = ({ c }) => {
    const { id, participants, lastMessage, updatedAt } = c || {};
    const { content } = lastMessage || {};

    const middleWidth = `calc(100% - ${CONVERSATION_IMAGE_WIDTH} - ${END_WIDTH})`;

    return (
        <>
            <Avatars userIds={participants} />

            <Stack width={middleWidth}>
                <Title
                    name={id}
                    userIdsCount={participants.length}
                    userId0={participants?.[0]}
                />
                <LastMessage content={content} />
            </Stack>

            <Stack width={END_WIDTH} height={1} alignItems="end">
                <UpdatedAt date={updatedAt} />
                <StatusIndicator />
            </Stack>
        </>
    );
};

// ----------------------------------------------------------------------

interface ConversationStackProps extends PropsWithChildren {
    cId: string;
}

const ConversationStack: FC<ConversationStackProps> = ({ cId, children }) => {
    const { conversationId, setConversationId } =
        useSelectedConversationContext();

    const isSelected = conversationId === cId;

    const handleClick = useCallback(() => setConversationId(cId), []);

    return (
        <Stack
            width={1}
            minHeight="62px"
            direction="row"
            spacing={1}
            sx={getUserOptionSx(isSelected)}
            onClick={handleClick}
        >
            {children}
        </Stack>
    );
};

// ----------------------------------------------------------------------

interface UserOptionProps {
    c: IConversation;
}

const Conversation: FC<UserOptionProps> = ({ c }) => {
    const isCreate = c.id === NEW_CONVERSATION_ID;

    const content = isCreate ? <CreateContentDummy /> : <Content c={c} />;

    return <ConversationStack cId={c.id}>{content}</ConversationStack>;
};

export default Conversation;
