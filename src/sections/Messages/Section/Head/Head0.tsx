import Typography from "@mui/material/Typography";
import { HEAD_HEIGHT } from "../constants";
import { useTranslation } from "react-i18next";
import { getBorderColor2 } from "@/theme/borderColor";
import { SpaceBetween } from "@/components/styled";
import IconButton from "@mui/material/IconButton";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useSelectedConversationContext } from "../SelectedConversation";

const CreateButton = () => {
    const { isCreating, startCreating } = useSelectedConversationContext();
    return (
        <IconButton
            disabled={isCreating}
            sx={{ visibility: isCreating ? "hidden" : "visible" }}
            onClick={startCreating}
        >
            <AddCommentIcon />
        </IconButton>
    );
};

const Head0 = () => {
    const { t } = useTranslation();
    return (
        <SpaceBetween
            minHeight={HEAD_HEIGHT}
            height={HEAD_HEIGHT}
            maxHeight={HEAD_HEIGHT}
            width={1}
            alignItems="center"
            pl={5}
            pr={1}
            borderBottom="1px solid"
            borderColor={getBorderColor2}
        >
            <Typography variant="h6">{t("Messages")}</Typography>
            <CreateButton />
        </SpaceBetween>
    );
};

export default Head0;
