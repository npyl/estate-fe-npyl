const LabelSection = dynamic(() => import("@/ui/LabelSection"));
const RHFLabelSection = dynamic(() => import("./RHFCreate"));
import { LabelSectionTitleClassName } from "@/ui/LabelSection/CreateAssign";
import { Stack, SxProps, Theme, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { FC } from "react";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------------

const LabelSectionSx: SxProps<Theme> = {
    [`.${LabelSectionTitleClassName}`]: {
        visibility: "hidden",
    },
};

interface ContentProps {
    cardId?: number;
}

const Content: FC<ContentProps> = ({ cardId }) => {
    if (cardId) {
        return (
            <LabelSection
                variant="ticket"
                resourceId={cardId}
                sx={LabelSectionSx}
            />
        );
    }

    return <RHFLabelSection sx={LabelSectionSx} />;
};

// ----------------------------------------------------------------------------

interface LabelsProps extends ContentProps {}

const Labels: FC<LabelsProps> = ({ cardId }) => {
    const { t } = useTranslation();
    return (
        <Stack spacing={0.5}>
            <Typography fontWeight="bold">{t("Labels")}</Typography>
            <Content cardId={cardId} />
        </Stack>
    );
};

export default Labels;
