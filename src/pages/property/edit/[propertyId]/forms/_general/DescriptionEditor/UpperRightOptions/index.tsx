import { LoadingButton } from "@mui/lab";
import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@/components/Language/types";
import { IOpenAIDetailsPOST } from "src/types/openai";
import ChatGPTIcon from "@/assets/icons/GPTIcon";
import { useOpenAIDetails } from "../hooks";
import fixDropdowns from "./stupid";
import useResponsive from "@/hooks/useResponsive";

interface UpperRightOptionsProps {
    lang: Language;
    isLoading: boolean;
    onGenerate: (d: IOpenAIDetailsPOST, styling: boolean) => Promise<string>;
    onChatTextChange: (s: string) => void;
    onClickTranslate: () => void;
}

const UpperRightOptions = ({
    onGenerate,
    onChatTextChange,
    onClickTranslate,
    isLoading,
    lang,
}: UpperRightOptionsProps) => {
    const { t } = useTranslation();
    const [styling, setStyling] = useState(false);

    const belowMd = useResponsive("down", "md");

    const { openAIDetails } = useOpenAIDetails(lang);

    const canTranslate = useMemo(() => lang === "en", [lang]);

    const handleGenerate = useCallback(
        () =>
            onGenerate(
                {
                    ...openAIDetails,
                    styling,
                    ...fixDropdowns(openAIDetails),
                },
                styling
            ).then(onChatTextChange),
        [openAIDetails, styling]
    );

    const chatGPTButton = useMemo(
        () => (
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
        ),
        [isLoading, handleGenerate, belowMd]
    );

    const handleStylingChange = (event: any) => {
        setStyling(event.target.checked);
    };

    return (
        <Box display="flex" flexDirection="row" gap={1}>
            {/* Checkbox for styling */}
            <FormControlLabel
                control={
                    <Checkbox
                        checked={styling}
                        onChange={handleStylingChange}
                        color="primary"
                    />
                }
                label={t("Opt for styled text")}
            />
            {canTranslate ? (
                <Button onClick={onClickTranslate}>
                    {t("Translate from greek")}
                </Button>
            ) : null}
            {chatGPTButton}
        </Box>
    );
};

export default UpperRightOptions;
