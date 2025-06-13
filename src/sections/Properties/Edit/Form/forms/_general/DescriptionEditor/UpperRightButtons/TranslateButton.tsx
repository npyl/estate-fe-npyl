import { Button } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext, useWatch } from "react-hook-form";
import TranslateIcon from "@mui/icons-material/Translate";
import { HideText } from "@/components/styled";
import { useOperationsContext } from "../context/OperationsContext";
import { useEditorHandleContext } from "../context/EditorHandle";
import { IPropertyYup } from "../../../../hook";

const useTypedWatch = (field: "title" | "descriptionText") =>
    (useWatch<IPropertyYup>({ name: `descriptions.0.${field}` }) ||
        "") as string;

const TranslateButton = () => {
    const { t } = useTranslation();

    const { editorRef } = useEditorHandleContext();
    const { setValue } = useFormContext<IPropertyYup>();

    const title = useTypedWatch("title");
    const description = useTypedWatch("descriptionText");

    const { translate, isLoading } = useOperationsContext();

    const handleClick = useCallback(async () => {
        if (!title && !description) return;

        const body = {
            source_lang: "EL",
            target_lang: "EN",
            text: [title, description],
        };

        const res = await translate(body).unwrap();
        const translatedTexts = res.translations.map(({ text }) => text);

        setValue("descriptions.1.title", translatedTexts[0]);
        editorRef.current?.commands.setContent(translatedTexts[1], true);
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
