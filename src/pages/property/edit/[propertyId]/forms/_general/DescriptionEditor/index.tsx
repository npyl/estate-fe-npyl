import Typography from "@mui/material/Typography";
import {
    ContentState,
    EditorState,
    convertFromHTML,
    convertFromRaw,
    convertToRaw,
} from "draft-js";
import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Language } from "@/components/Language/types";
import DraftEditor from "@/components/draft-editor";
import { RHFTextField } from "@/components/hook-form";
import TabbedBox from "./TabbedBox";
import { TABS } from "./constants";
import useInitialDescriptionState from "./useInitialState";
import UpperRightOptions from "./UpperRightOptions";
import GPTResult, { GPTResultRef } from "./GPTResult";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const DescriptionSection: React.FC = () => {
    const { t } = useTranslation();
    const { setValue, watch } = useFormContext();

    const [lang, setLang] = useState<Language>("el");

    const resultSectionRef = useRef<GPTResultRef>(null);

    const handleGenerate = useCallback(async (s: string, styling: boolean) => {
        let contentState: ContentState | null;

        if (styling) {
            // We received HTML string, convert it to ContentState
            const blocks = convertFromHTML(s);

            if (!blocks) return;

            contentState = ContentState.createFromBlockArray(
                blocks.contentBlocks,
                blocks.entityMap
            );
        } else {
            contentState = ContentState.createFromText(s);
        }

        const newEditorState = EditorState.createWithContent(contentState);

        resultSectionRef.current?.setEditorState(newEditorState);

        // Visible & scroll
        if (resultSectionRef.current && resultSectionRef.current?.div) {
            resultSectionRef.current.div.style.display = "block";
            resultSectionRef.current.div.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

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
            setValue("descriptions[1].title", translatedTexts[0]);
            const contentState = convertFromRaw(JSON.parse(translatedTexts[1]));
            onEditorStateChange(EditorState.createWithContent(contentState));
        },
        [onEditorStateChange]
    );

    return (
        <TabbedBox<Language>
            tabs={TABS}
            selected={lang}
            endNode={
                <UpperRightOptions
                    onGenerate={handleGenerate}
                    isLoading={false}
                    lang={lang}
                    onTranslate={handleTranslate}
                />
            }
            onSelect={handleTabChange}
            // TODO:
            // disabled={isGenerating || isImproving}
        >
            <Typography variant="h6" flex={1}>
                {`${t("Title")} (${lang})`}
            </Typography>
            <RHFTextField fullWidth key={title} name={title} />
            <Typography variant="h6" flex={1}>
                {`${t("Description")} (${lang})`}
            </Typography>

            <DraftEditor
                sx={{
                    minHeight: "200px",
                    height: "auto",
                }}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
            />

            <GPTResult ref={resultSectionRef} lang={lang} />
        </TabbedBox>
    );
};

export default DescriptionSection;
