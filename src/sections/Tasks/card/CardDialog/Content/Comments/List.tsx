import { IKanbanComment } from "@/types/tasks";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import { SpaceBetween } from "@/components/styled";
import { useGetCommentsForCardQuery } from "@/services/tasks";
import { SxProps, Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import Avatar from "@/components/Avatar";
import { generateHTML } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";

// ----------------------------------------------------------------------

const renderTipTapHTML = (json: any) => {
    try {
        return generateHTML(json, [
            Document,
            Paragraph,
            Text,
            Bold,
            Italic,
            Underline,
            BulletList,
            OrderedList,
            ListItem,
            TextStyle,
            Color,
            Strike,
            Heading,
            Blockquote,
            TextAlign.configure({ types: ["paragraph", "heading"] }),
        ]);
    } catch (e) {
        console.error("Error rendering TipTap content", e);
        return "";
    }
};
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
        mode === "light" ? "#FCE9A4" : neutral?.[800],
    borderRadius: "16px",
    borderTopLeftRadius: 0,
    padding: "7px 14px",
    lineHeight: 1.4,
    fontSize: "0.95rem",
    whiteSpace: "pre-wrap",
    "& p": { margin: 0 },
};

interface MessageProps {
    m?: string;
}

const Message: FC<MessageProps> = ({ m }) => {
    let html = "";
    //Check if message is a valid TipTap JSON string
    const isTipTapJson = (input: string | undefined): boolean => {
        if (!input) return false;
        try {
            const parsed = JSON.parse(input);
            return parsed?.type === "doc" && Array.isArray(parsed?.content);
        } catch {
            return false;
        }
    };

    if (isTipTapJson(m)) {
        try {
            html = renderTipTapHTML(JSON.parse(m || ""));
        } catch (e) {
            console.error("Failed to render TipTap:", m);
            html = m ?? "";
        }
    } else {
        // Fallback to escape plain text.This handles the comments created before the editor was applied.
        const safeText = m
            ?.replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br>");
        html = `<p>${safeText}</p>`;
    }

    return (
        <Typography
            component="div"
            sx={MessageSx}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

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
    const sortedComments = [...(comments ?? [])].sort(
        (olderComment, newerComment) =>
            new Date(olderComment.createdAt).getTime() -
            new Date(newerComment.createdAt).getTime()
    );
    return <Stack spacing={1}>{sortedComments?.map(getComment)}</Stack>;
};

export default List;
