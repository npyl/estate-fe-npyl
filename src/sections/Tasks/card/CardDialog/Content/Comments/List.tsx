import { IKanbanComment } from "@/types/tasks";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import { SpaceBetween } from "@/components/styled";
import { useGetCommentsForCardQuery } from "@/services/tasks";
import { SxProps, Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import Avatar from "@/components/Avatar";

// ----------------------------------------------------------------------

interface UsernameProps {
    firstName: string;
    lastName: string;
}

const Username: FC<UsernameProps> = ({ firstName, lastName }) => (
    <Typography fontWeight="bold">
        {firstName || ""} {lastName || ""}
    </Typography>
);

// ----------------------------------------------------------------------

const OPTIONS: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
};

interface CreationDateProps {
    createdAt: string;
}

const CreationDate: FC<CreationDateProps> = ({ createdAt }) => {
    const { i18n } = useTranslation();
    const loc = i18n.language === "en" ? "en-US" : "el-GR";

    const date = createdAt
        ? new Date(createdAt).toLocaleDateString(loc, OPTIONS)
        : "";

    return <Typography>{date}</Typography>;
};

// ----------------------------------------------------------------------

interface HeaderProps {
    firstName: string;
    lastName: string;
    createdAt: string;
}

const Header: FC<HeaderProps> = ({ firstName, lastName, createdAt }) => (
    <SpaceBetween alignItems="center">
        <Username firstName={firstName} lastName={lastName} />
        <CreationDate createdAt={createdAt} />
    </SpaceBetween>
);

// ----------------------------------------------------------------------

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
    c: IKanbanComment;
}

const Comment: FC<CommentProps> = ({ c }) => {
    const { avatar, firstName, lastName } = c?.creator;
    const { message, createdAt } = c;

    return (
        <Stack direction="row" spacing={1}>
            <Avatar src={avatar} firstName={firstName} lastName={lastName} />
            <Stack width={1}>
                <Header
                    firstName={firstName}
                    lastName={lastName}
                    createdAt={createdAt}
                />
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
    return <Stack spacing={1}>{comments?.map(getComment)}</Stack>;
};

export default List;
