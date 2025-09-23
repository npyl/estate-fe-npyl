import { FC } from "react";
import NoteSection from "@/ui/Note/Section";
import isFalsy from "@/utils/isFalsy";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";

interface CommentsProps {
    cardId?: number;
}

const Comments: FC<CommentsProps> = ({ cardId }) => {
    const { t } = useTranslation();
    if (isFalsy(cardId)) return null;
    return (
        <Stack spacing={0.5}>
            <Typography fontWeight="bold">{t("Comments")}</Typography>
            <NoteSection noPanel resource="ticket" resourceId={cardId} />
        </Stack>
    );
};

export default Comments;
