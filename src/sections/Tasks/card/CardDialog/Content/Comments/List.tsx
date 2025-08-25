import { IKanbanComment } from "@/types/tasks";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import { SpaceBetween } from "@/components/styled";
import { useGetCommentsForCardQuery } from "@/services/tasks";
import { SxProps, Theme } from "@mui/material";
import Avatar from "@/components/Avatar";
import Reader from "@/components/Editor/Reader";

// ----------------------------------------------------------------------

interface CreationDateProps {
    createdAt: string;
}

const CreationDate: FC<CreationDateProps> = ({ createdAt }) => {
    if (!createdAt) return null;

    const date = new Date(createdAt);

    // Force 2-digit hour & minute, numeric day/month/year
    const formatted = date.toLocaleString("el-GR", {
        hour: "2-digit",
        minute: "2-digit",
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour12: false,
    });

    return (
        <Typography variant="caption" color="text.secondary">
            {formatted}
        </Typography>
    );
};

// ----------------------------------------------------------------------

const MessageSx: SxProps<Theme> = {
    backgroundColor: ({ palette: { mode, neutral } }) =>
        mode === "light" ? "#FCE9A4" : neutral?.[800],
    borderRadius: "7px",
    // borderTopLeftRadius: 0,
    padding: "7px 7px",
    lineHeight: 1.4,
    fontSize: "0.95rem",
    color: "text.secondary",
    whiteSpace: "pre-wrap",
    "& p": { margin: 0 },
};

interface MessageProps {
    m?: string;
}

const Message: FC<MessageProps> = ({ m }) => (
    <Reader content={m} component="div" sx={MessageSx} />
);

// ----------------------------------------------------------------------

interface CommentProps {
    c: IKanbanComment;
}

const Comment: FC<CommentProps> = ({ c }) => {
    const { avatar, firstName, lastName } = c?.creator || {};
    const { message, createdAt } = c;

    return (
        <Stack direction="row" spacing={1} alignItems="flex-start">
            {/* Avatar on the left, outside the message box */}
            <Avatar src={avatar} firstName={firstName} lastName={lastName} />

            {/* Yellow message box */}
            <Stack sx={MessageSx} width={1}>
                {/* Name + Date row */}
                <SpaceBetween alignItems="center" px={0.7}>
                    <Typography fontWeight="bold" color={"black"}>
                        {firstName || ""} {lastName || ""}
                    </Typography>
                    <CreationDate createdAt={createdAt} />
                </SpaceBetween>

                {/* Message content */}
                <Message m={message} />
            </Stack>
        </Stack>
    );
};

// ----------------------------------------------------------------------

const getComment = (c: IKanbanComment) => <Comment key={c.id} c={c} />;

// ----------------------------------------------------------------------

interface ListProps {
    cardId?: number;
}

const List: FC<ListProps> = ({ cardId }) => {
    const { data: comments } = useGetCommentsForCardQuery(cardId!, {
        skip: cardId === undefined,
    });
    const sortedComments = [...(comments ?? [])].sort(
        (olderComment, newerComment) =>
            new Date(olderComment.createdAt).getTime() -
            new Date(newerComment.createdAt).getTime()
    );
    return <Stack spacing={1}>{sortedComments?.map(getComment)}</Stack>;
};

export default List;
