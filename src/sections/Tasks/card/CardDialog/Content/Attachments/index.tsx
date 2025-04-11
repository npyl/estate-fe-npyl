import { FC } from "react";
import { AttachmentsProvider } from "./Context";
import AttachmentsButton from "./Button";
import Attachments from "./Attachments";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface AttachmentsProps {
    cardId?: number;
}

const AttachmentsSection: FC<AttachmentsProps> = ({ cardId }) => {
    const { t } = useTranslation();
    return (
        <AttachmentsProvider>
            <Box>
                <Typography fontWeight="bold" pb={0.5}>
                    {t("Attachments")}
                </Typography>

                <AttachmentsButton cardId={cardId} />
                <Attachments cardId={cardId} />
            </Box>
        </AttachmentsProvider>
    );
};

export default AttachmentsSection;
