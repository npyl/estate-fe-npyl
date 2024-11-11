import { useFormContext } from "react-hook-form";
import { commentsKey } from "../contants";
import { IKanbanCommentPOST } from "@/types/tasks";
import Stack, { StackProps } from "@mui/material/Stack";
import { FC } from "react";
import CreatorAvatar from "./CreatorAvatar";
import Typography from "@mui/material/Typography";
import { SpaceBetween } from "@/components/styled";
import { useGetUserQuery } from "@/services/user";
import Skeleton from "@mui/material/Skeleton";
import { useGetCommentByIdQuery } from "@/services/tasks";
import { Button, SxProps, Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import uuidv4 from "@/utils/uuidv4";

// ----------------------------------------------------------------------
interface UsernameProps {
    id: number;
}

const Username: FC<UsernameProps> = ({ id }) => {
    const { data, isLoading } = useGetUserQuery(id, {
        skip: id === -1,
    });

    if (isLoading) return <Skeleton width="100px" height="48px" />;

    if (!data?.firstName || !data?.lastName)
        return <Typography fontWeight="bold">-</Typography>;

    return (
        <Typography fontWeight="bold">
            {data?.firstName || ""} {data?.lastName || ""}
        </Typography>
    );
};

const OPTIONS: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
};

interface CreationDateProps {
    commentId: number;
}

const CreationDate: FC<CreationDateProps> = ({ commentId }) => {
    const { i18n } = useTranslation();
    const loc = i18n.language === "en" ? "en-US" : "el-GR";

    const { data, isLoading } = useGetCommentByIdQuery(commentId, {
        skip: commentId === -1,
    });

    if (isLoading) return <Skeleton width="100px" height="48px" />;

    const date = data?.createdAt
        ? new Date(data?.createdAt).toLocaleDateString(loc, OPTIONS)
        : "";

    return <Typography>{date}</Typography>;
};

// ----------------------------------------------------------------------
interface HeaderProps {
    creatorId?: number;
    commentId?: number;
}

const Header: FC<HeaderProps> = ({ creatorId = -1, commentId = -1 }) => (
    <SpaceBetween alignItems="center">
        <Username id={creatorId} />
        <CreationDate commentId={commentId} />
    </SpaceBetween>
);

const MessageSx: SxProps<Theme> = {
    backgroundColor: ({ palette: { mode, neutral } }) =>
        mode === "light" ? neutral?.[250] : neutral?.[800],
    borderRadius: "16px",
    borderTopLeftRadius: 0,
    p: 1,
};

interface MessageProps {
    m?: string;
}

const Message: FC<MessageProps> = ({ m }) => (
    <Typography sx={MessageSx}>{m}</Typography>
);

// ----------------------------------------------------------------------
interface CommentProps {
    c: IKanbanCommentPOST;
}

const Comment: FC<CommentProps> = ({ c }) => (
    <Stack direction="row" spacing={1}>
        <CreatorAvatar creatorId={c?.creatorId ?? -1} />
        <Stack width={1}>
            <Header creatorId={c?.creatorId} commentId={c?.id} />
            <Message m={c?.message} />
        </Stack>
    </Stack>
);

// ----------------------------------------------------------------------

const getKey = (id?: number) => id || uuidv4();

const getComment = (c: IKanbanCommentPOST) => (
    <Comment key={getKey(c.id)} c={c} />
);

// ----------------------------------------------------------------------
const List = () => {
    const { watch } = useFormContext();
    const comments = (watch(commentsKey) as IKanbanCommentPOST[]) || [];
    return <Stack spacing={1}>{comments.map(getComment)}</Stack>;
};

export default List;
