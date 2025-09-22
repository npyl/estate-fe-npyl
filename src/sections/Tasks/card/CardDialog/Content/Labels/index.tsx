import RHFLabelSection from "./RHFCreate";
import { LabelSectionTitleClassName } from "@/ui/LabelSection/CreateAssign";
import { Stack, SxProps, Theme, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const LabelSectionSx: SxProps<Theme> = {
    [`.${LabelSectionTitleClassName}`]: {
        visibility: "hidden",
    },
};

interface LabelsProps {
    cardId?: number;
}

const Labels: FC<LabelsProps> = ({ cardId }) => {
    const { t } = useTranslation();
    return (
        <Stack spacing={0.5}>
            <Typography fontWeight="bold">{t("Labels")}</Typography>
            <RHFLabelSection
                name="labels"
                variant="ticket"
                resourceId={cardId}
                sx={LabelSectionSx}
            />
        </Stack>
    );
};

export default Labels;
