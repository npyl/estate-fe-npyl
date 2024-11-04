import { Button } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { useTranslateMutation } from "@/services/translate";

interface TranslateButtonProps {
    onTranslate: (translatedTexts: string[]) => void;
}

const TranslateButton: FC<TranslateButtonProps> = ({ onTranslate }) => {
    const { watch } = useFormContext();

    const { t } = useTranslation();

    const [translate] = useTranslateMutation();

    const handleClick = async () => {
        const titleToTranslate = watch("descriptions[0].title");
        const descriptionToTranslate = watch("descriptions[0].description");

        if (!titleToTranslate && !descriptionToTranslate) return;

        const textsToTranslate = [];
        if (titleToTranslate) textsToTranslate.push(titleToTranslate);
        if (descriptionToTranslate)
            textsToTranslate.push(descriptionToTranslate);

        const params = {
            source_lang: "EL",
            target_lang: "EN",
            text: textsToTranslate,
        };

        const res = await translate(params).unwrap();
        const translatedTexts = res.translations.map(({ text }) => text);

        onTranslate(translatedTexts);
    };

    return <Button onClick={handleClick}>{t("Translate from greek")}</Button>;
};

export default TranslateButton;
