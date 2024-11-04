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
    };

    return <Button onClick={handleClick}>{t("Translate from greek")}</Button>;
};

export default TranslateButton;
