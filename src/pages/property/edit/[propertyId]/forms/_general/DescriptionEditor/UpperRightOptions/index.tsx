import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@/components/Language/types";
import dynamic from "next/dynamic";
import GenerateButton from "./GenerateButton";
const TranslateButton = dynamic(() => import("./TranslateButton"));

interface UpperRightOptionsProps {
    lang: Language;
    isLoading: boolean;
    onGenerate: (s: string) => void;
    onTranslate: (translatedTexts: string[]) => void;
}

const UpperRightOptions = ({
    onGenerate,
    onTranslate,
    lang,
}: UpperRightOptionsProps) => {
    const { t } = useTranslation();
    const [styling, setStyling] = useState(false);

    const canTranslate = lang === "en";

    const handleStylingChange = (event: any) =>
        setStyling(event.target.checked);

    return (
        <Stack direction="row" spacing={1}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={styling}
                        onChange={handleStylingChange}
                    />
                }
                label={t("Opt for styled text")}
            />

            {canTranslate ? (
                <TranslateButton onTranslate={onTranslate} />
            ) : null}

            <GenerateButton
                lang={lang}
                styling={styling}
                onGenerate={onGenerate}
            />
        </Stack>
    );
};

export default UpperRightOptions;
