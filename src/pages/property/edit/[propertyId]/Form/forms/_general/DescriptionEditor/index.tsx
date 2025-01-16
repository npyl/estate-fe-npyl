import Typography from "@mui/material/Typography";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Language } from "@/components/Language/types";
import DraftEditor from "@/components/draft-editor";
import { RHFTextField } from "@/components/hook-form";
import TabbedBox from "./TabbedBox";
import { TABS } from "./constants";
import useInitialDescriptionState from "./useInitialState";
import UpperRightButtons from "./UpperRightButtons";
import { SxProps, Theme } from "@mui/material";
import { textToEditorState } from "./util";
import { OperationsProvider, useOperationsContext } from "./context";
import sleep from "@/utils/sleep";

const EditorSx: SxProps<Theme> = {
    minHeight: "200px",
    height: "auto",
};

const DescriptionSection: React.FC = () => {
    const { t } = useTranslation();
    const { setValue, watch } = useFormContext();

    const [lang, setLang] = useState<Language>("el");

    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );

    // --- Initial State ---
    useInitialDescriptionState(setEditorState);

    // ---

    const index = useMemo(
        () => TABS.findIndex(({ value }) => lang === value),
        [lang]
    );

    const name = useCallback(
        (s: string) => `descriptions[${index}].${s}`,
        [index]
    );

    const title = useMemo(() => name("title"), [name]);
    // ---

    const { isLoading } = useOperationsContext();

    const debouncedValuesChange = useCallback(
        async (newEditorState: EditorState) => {
            await sleep(100);

            const contentState = newEditorState.getCurrentContent();
            const plainText = contentState.getPlainText();
            setValue(name("descriptionText"), plainText);

            const contentStateJSON = JSON.stringify(convertToRaw(contentState));
            setValue(name("description"), contentStateJSON);
        },
        [name]
    );

    const onEditorStateChange = useCallback(
        (newEditorState: EditorState) => {
            setEditorState(newEditorState);
            debouncedValuesChange(newEditorState);
        },
        [debouncedValuesChange]
    );

    const handleTabChange = useCallback((s: Language) => {
        setLang(s);

        const index = TABS.findIndex(({ value }) => s === value);
        const description = watch(`descriptions[${index}].description`);

        if (!description) {
            setEditorState(EditorState.createEmpty());
            return;
        }

        const contentState = convertFromRaw(JSON.parse(description));
        setEditorState(EditorState.createWithContent(contentState));
    }, []);

    const handleTranslate = useCallback(
        async (translatedTexts: string[]) => {
            try {
                setValue("descriptions[1].title", translatedTexts[0]);

                const ns = textToEditorState(translatedTexts[1], false);
                if (!ns) return;

                onEditorStateChange(ns);
            } catch (ex) {}
        },
        [onEditorStateChange]
    );

    return (
        <TabbedBox<Language>
            tabs={TABS}
            selected={lang}
            disabled={isLoading}
            endNode={
                <UpperRightButtons
                    lang={lang}
                    editorState={editorState}
                    // ...
                    onTranslate={handleTranslate}
                    onContentChange={onEditorStateChange}
                />
            }
            onSelect={handleTabChange}
        >
            <Typography variant="h6" flex={1}>
                {`${t("Title")} (${lang})`}
            </Typography>
            <RHFTextField fullWidth key={title} name={title} />
            <Typography variant="h6" flex={1}>
                {`${t("Description")} (${lang})`}
            </Typography>

            <DraftEditor
                sx={EditorSx}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
            />
        </TabbedBox>
    );
};

const WithProvider = () => (
    <OperationsProvider>
        <DescriptionSection />
    </OperationsProvider>
);

export default WithProvider;
