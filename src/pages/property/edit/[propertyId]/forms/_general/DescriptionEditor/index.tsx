import Typography from "@mui/material/Typography";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Language } from "@/components/Language/types";
import DraftEditor from "@/components/draft-editor";
import { RHFTextField } from "@/components/hook-form";
import {
    useGenerateDescriptionMutation,
    useImproveDescriptionMutation,
} from "src/services/properties";
import { IOpenAIDetailsPOST } from "src/types/openai";
import TabbedBox from "./TabbedBox";
import { useOpenAIDetails } from "./hooks";
import { useTranslateMutation } from "@/services/translate";
import { TABS } from "./constants";
import useInitialDescriptionState from "./useInitialState";
import UpperRightOptions from "./UpperRightOptions";
import ChatGPTResult from "./ChatGPTResult";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const sanitizePayload = (payload: IOpenAIDetailsPOST) => {
    return Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== "")
    );
};

const DescriptionSection: React.FC = () => {
    const { t } = useTranslation();
    const { setValue, watch } = useFormContext();

    const [chatTextEN, setChatTextEN] = useState("");
    const [chatTextGR, setChatTextGR] = useState("");
    const [generateDescription, { isLoading: isGenerating }] =
        useGenerateDescriptionMutation();

    const [improveDescription, { isLoading: isImproving }] =
        useImproveDescriptionMutation();

    const [generatedDescription, setGeneratedDescription] = useState("");

    const [lang, setLang] = useState<Language>("el");
    const { openAIDetails } = useOpenAIDetails(lang);

    const resultSectionRef = useRef<HTMLDivElement>(null);

    const generateCallback = useCallback(async (d: IOpenAIDetailsPOST) => {
        const description = await generateDescription(d).unwrap();

        setGeneratedDescription(description); // Store it for later use as oldDescription

        // Scroll to the ChatGPT Result section after generation
        resultSectionRef.current?.scrollIntoView({ behavior: "smooth" });

        return description;
    }, []);

    const improveCallback = useCallback(
        async (selectedOption: string, styling: boolean) => {
            const sanitizedPayload = sanitizePayload({
                ...openAIDetails,
                oldDescription: generatedDescription, // Use the generated description as oldDescription
                improveOption: selectedOption,
                styling, // Pass the selected improvement option
            });

            const text = await improveDescription(sanitizedPayload).unwrap();

            console.log("TEXT: ", text);

            if (lang === "en") {
                setChatTextEN(text);
            } else {
                setChatTextGR(text);
            }

            return text;
        },
        [generatedDescription, lang, openAIDetails, improveDescription]
    );

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

    const onChatTextChange = useCallback(
        (s: string) => (lang === "en" ? setChatTextEN(s) : setChatTextGR(s)),
        [lang]
    );

    const [translate] = useTranslateMutation();

    const handleTranslate = useCallback(async () => {
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

        try {
            const res = await translate(params).unwrap();
            const translatedTexts = res.translations.map(({ text }) => text);

            setValue("descriptions[1].title", translatedTexts[0]);
            const contentState = convertFromRaw(JSON.parse(translatedTexts[1]));
            onEditorStateChange(EditorState.createWithContent(contentState));
        } catch (error) {
            console.error("Translation error:", error);
        }
    }, [onEditorStateChange]);

    return (
        <TabbedBox<Language>
            tabs={TABS}
            selected={lang}
            endNode={
                <UpperRightOptions
                    onGenerate={generateCallback}
                    onChatTextChange={onChatTextChange}
                    isLoading={isGenerating || isImproving}
                    lang={lang}
                    onClickTranslate={handleTranslate}
                />
            }
            onSelect={handleTabChange}
            disabled={isGenerating || isImproving}
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
            <ChatGPTResult
                lang={lang}
                chatTextEN={chatTextEN}
                chatTextGR={chatTextGR}
                isImproving={isImproving}
                onImprove={improveCallback}
                scrollRef={resultSectionRef}
            />
        </TabbedBox>
    );
};

export default DescriptionSection;
