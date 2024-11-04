import { LoadingButton } from "@mui/lab";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@/components/Language/types";
import ChatGPTIcon from "@/assets/icons/GPTIcon";
import { useImproveDescriptionMutation } from "@/services/properties";
import { useOpenAIDetails } from "../hooks";
import { IOpenAIDetailsPOST } from "@/types/openai";

const sanitizePayload = (payload: IOpenAIDetailsPOST) => {
    return Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== "")
    );
};

interface ImproveButtonProps {
    styling: boolean;
    lang: Language;
    improveOption: string;
    onImprove: (s: string, styling: boolean) => void;
}

const ImproveButton: FC<ImproveButtonProps> = ({
    styling,
    lang,
    improveOption,
    onImprove,
}) => {
    const { t } = useTranslation();

    const { openAIDetails } = useOpenAIDetails(lang);

    const [improveDescription, { isLoading: isImproving }] =
        useImproveDescriptionMutation();

    const handleImprove = async () => {
        // TODO: take raw.
        const oldDescription = "";

        const sanitizedPayload = sanitizePayload({
            ...openAIDetails,
            oldDescription,
            improveOption,
            styling,
        });

        const text = await improveDescription(sanitizedPayload).unwrap();

        onImprove(text, styling);
    };

    return (
        <LoadingButton
            loading={isImproving}
            loadingPosition="start"
            startIcon={<ChatGPTIcon />}
            variant="outlined"
            onClick={handleImprove}
            sx={{ mt: 0, justifySelf: "flex-end" }}
        >
            {isImproving ? t("Improving...") : t("Improve Description")}
        </LoadingButton>
    );
};

export default ImproveButton;
