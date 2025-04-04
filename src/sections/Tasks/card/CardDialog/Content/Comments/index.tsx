import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Create from "./Create";
import List from "./List";
import { FC } from "react";

interface CommentsProps {
    cardId?: number;
}

const Comments: FC<CommentsProps> = ({ cardId }) => {
    const { t } = useTranslation();

    return (
        <Stack spacing={1} width={1}>
            {cardId ? (
                <Typography fontWeight="bold">{t("Comments")}</Typography>
            ) : null}
            <List cardId={cardId} />
            {cardId ? <Create cardId={cardId} /> : null}
        </Stack>
    );
};

export default Comments;
