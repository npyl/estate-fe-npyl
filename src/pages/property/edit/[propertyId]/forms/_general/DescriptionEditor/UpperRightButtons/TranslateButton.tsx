import { Button } from "@mui/material";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import TranslateIcon from "@mui/icons-material/Translate";
import { HideText } from "./style";
import { useOperationsContext } from "../context";

interface TranslateButtonProps {
    onTranslate: (translatedTexts: string[]) => void;
}

const TranslateButton: FC<TranslateButtonProps> = ({ onTranslate }) => {
    const { t } = useTranslation();

    const { watch } = useFormContext();
    const { translate, isLoading } = useOperationsContext();

    const handleClick = useCallback(async () => {
        const title = watch("descriptions[0].title");
        const description = watch("descriptions[0].descriptionText");

        if (!title && !description) return;

        const body = {
            source_lang: "EL",
            target_lang: "EN",
            text: [title, description],
        };

        const res = await translate(body).unwrap();
        const translatedTexts = res.translations.map(({ text }) => text);

        onTranslate(translatedTexts);
    }, []);

    return (
        <Button
            onClick={handleClick}
            startIcon={<TranslateIcon />}
            disabled={isLoading}
            sx={HideText}
        >
            {t("Translate from greek")}
        </Button>
    );
};

export default TranslateButton;
