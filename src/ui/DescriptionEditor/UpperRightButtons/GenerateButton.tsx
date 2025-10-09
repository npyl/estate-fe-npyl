import { FC } from "react";
import { useTranslation } from "react-i18next";
import useOpenAIDetails from "./useOpenAIDetails";
import useDialog from "@/hooks/useDialog";
import { MenuItem } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ChatGPTIcon from "@/assets/icons/GPTIcon";
import OptionButton from "@/components/OptionButton";
import { PopoverProps } from "./style";
import { useOperationsContext } from "../context/OperationsContext";
import { HideText } from "@/components/styled";
import { useEditorHandleContext } from "../context/EditorHandle";
import { Language } from "@/components/LanguageButton/types";

interface GenerateButtonProps {
    lang: Language;
}

const GenerateButton: FC<GenerateButtonProps> = ({ lang }) => {
    const { t } = useTranslation();

    const [styling, setStylingOn, setStylingOff] = useDialog();

    const { openAIDetails } = useOpenAIDetails(lang);

    const { editorRef } = useEditorHandleContext();
    const { generateDescription, isLoading } = useOperationsContext();

    const handleGenerate = async () => {
        try {
            const res = await generateDescription({
                ...openAIDetails,
                styling,
            }).unwrap();

            editorRef.current?.commands.setContent(res, true);
        } catch (ex) {}
    };

    return (
        <OptionButton
            disabled={isLoading}
            options={
                <>
                    <MenuItem onClick={setStylingOff}>{t("Generate")}</MenuItem>
                    <MenuItem onClick={setStylingOn}>
                        {t("Generate (RTF)")}
                    </MenuItem>
                </>
            }
            popoverProps={PopoverProps}
        >
            <LoadingButton
                disabled={isLoading}
                loading={isLoading}
                loadingPosition="start"
                startIcon={<ChatGPTIcon />}
                variant="outlined"
                onClick={handleGenerate}
                sx={HideText}
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
