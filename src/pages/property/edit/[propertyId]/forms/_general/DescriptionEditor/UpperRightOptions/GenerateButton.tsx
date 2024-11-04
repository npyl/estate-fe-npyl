import { LoadingButton } from "@mui/lab";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@/components/Language/types";
import ChatGPTIcon from "@/assets/icons/GPTIcon";
import { useOpenAIDetails } from "../hooks";
import fixDropdowns from "./stupid";
import useResponsive from "@/hooks/useResponsive";
import { useGenerateDescriptionMutation } from "@/services/properties";

interface GenerateButtonProps {
    lang: Language;
    styling: boolean;
    onGenerate: (s: string, styling: boolean) => void;
}

const GenerateButton: FC<GenerateButtonProps> = ({
    lang,
    styling,
    onGenerate,
}) => {
    const { t } = useTranslation();

    const { openAIDetails } = useOpenAIDetails(lang);
    const belowMd = useResponsive("down", "md");

    const [generateDescription, { isLoading }] =
        useGenerateDescriptionMutation();

    const handleGenerate = async () => {
        const res = await generateDescription({
            ...openAIDetails,
            styling,
            ...fixDropdowns(openAIDetails),
        }).unwrap();

        onGenerate(res, styling);
    };

    return (
        <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            startIcon={<ChatGPTIcon />}
            variant="outlined"
            onClick={handleGenerate}
        >
            {isLoading
                ? t("Generating...")
                : belowMd
                ? t("Generate")
                : t("Generate Description")}
        </LoadingButton>
    );
};

export default GenerateButton;
