import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@/components/Language/types";
import { useOpenAIDetails } from "../hooks";
import fixDropdowns from "./stupid";
import { useGenerateDescriptionMutation } from "@/services/properties";
import useDialog from "@/hooks/useDialog";
import { MenuItem } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ChatGPTIcon from "@/assets/icons/GPTIcon";
import OptionButton from "@/components/OptionButton";

interface GenerateButtonProps {
    lang: Language;
    onGenerate: (s: string, styling: boolean) => void;
}

const GenerateButton: FC<GenerateButtonProps> = ({ lang, onGenerate }) => {
    const { t } = useTranslation();

    const [styling, setStylingOn, setStylingOff] = useDialog();

    const { openAIDetails } = useOpenAIDetails(lang);

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
        <OptionButton
            options={
                <>
                    <MenuItem onClick={setStylingOff}>{t("Generate")}</MenuItem>
                    <MenuItem onClick={setStylingOn}>
                        {t("Generate (RTF)")}
                    </MenuItem>
                </>
            }
        >
            <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                startIcon={<ChatGPTIcon />}
                variant="outlined"
                onClick={handleGenerate}
            >
                {isLoading
                    ? t("Generating...")
                    : styling
                    ? t("Generate (RTF)")
                    : t("Generate")}
            </LoadingButton>
        </OptionButton>
    );
};

export default GenerateButton;
