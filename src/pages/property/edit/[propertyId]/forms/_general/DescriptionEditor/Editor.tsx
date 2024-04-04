import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
    ContentState,
    EditorState,
    convertFromRaw,
    convertToRaw,
} from "draft-js";
import { useRouter } from "next/router";
import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Language } from "src/components/Language/types";
import { DraftEditor } from "src/components/draft-editor";
import { RHFTextField } from "src/components/hook-form";
import {
    useGenerateDescriptionMutation,
    useLazyGetPropertyByIdQuery,
} from "src/services/properties";
import { IOpenAIDetailsPOST } from "src/types/openai";
import { IProperties } from "src/types/properties";
import ChatGPTIcon from "./GPTIcon";
import TabbedBox from "./TabbedBox";
import { useOpenAIDetails } from "./hooks";
import fixDropdowns from "./stupid";
import useResponsive from "@/hooks/useResponsive";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const TABS: {
    label: string;
    value: Language;
}[] = [
    { label: "GR", value: "el" },
    { label: "EN", value: "en" },
];

const useInitialDescriptionState = (
    setEditorState: (s: EditorState) => void
) => {
    const { setValue } = useFormContext();
    const { propertyId } = useRouter().query;
    const [getProperty] = useLazyGetPropertyByIdQuery();

    const setInitialState = useCallback((p: IProperties) => {
        const descriptions = p?.descriptions || [];

        Object.entries(descriptions)?.forEach(
            ([lang, { description, title }]) => {
                const i = TABS.findIndex(({ value }) => value === lang);

                const state = description
                    ? convertFromRaw(JSON.parse(description))
                    : ContentState.createFromText("");

                const plainText = state.getPlainText();
                const contentStateJSON = JSON.stringify(convertToRaw(state));

                setValue(`descriptions[${i}].descriptionText`, plainText);
                setValue(`descriptions[${i}].description`, contentStateJSON);
                setValue(`descriptions[${i}].title`, title);

                if (i === 0)
                    setEditorState(EditorState.createWithContent(state));
            }
        );
    }, []);

    useEffect(() => {
        getProperty(+propertyId!).unwrap().then(setInitialState);
    }, []);
};

interface UpperRightOptionsProps {
    lang: Language;
    isLoading: boolean;
    onGenerate: (d: IOpenAIDetailsPOST) => Promise<string>;
    onChatTextChange: (s: string) => void;
}

const UpperRightOptions = ({
    onGenerate,
    onChatTextChange,
    isLoading,
    lang,
}: UpperRightOptionsProps) => {
    const { t } = useTranslation();

    const belowMd = useResponsive("down", "md");

    const { openAIDetails } = useOpenAIDetails(lang);

    const canTranslate = useMemo(() => lang === "en", [lang]);

    const handleGenerate = useCallback(
        () =>
            onGenerate({
                ...openAIDetails,
                ...fixDropdowns(openAIDetails),
            }).then(onChatTextChange),
        [openAIDetails]
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

    const handleTranslate = useCallback(() => {}, []);

    return (
        <Box display="flex" flexDirection="row" gap={1}>
            {canTranslate ? (
                <Button onClick={handleTranslate}>
                    {t("Translate from greek")}
                </Button>
            ) : null}
            {chatGPTButton}
        </Box>
    );
};

interface ChatGPTResultProps {
    lang: Language;
    chatTextEN: string;
    chatTextGR: string;
}

const ChatGPTResult = ({
    lang,
    chatTextEN,
    chatTextGR,
}: ChatGPTResultProps) => {
    const { t } = useTranslation();

    const text = useMemo(
        () => (lang === "en" ? chatTextEN : chatTextGR),
        [lang, chatTextEN, chatTextGR]
    );

    // Show only if we have something to show
    const show = useMemo(() => !!text, [text]);

    return show ? (
        <>
            <Typography variant="h6" flex={1}>
                {`${t("ChatGPT Result")} (${lang})`}
            </Typography>
            <TextField
                value={text}
                multiline
                rows={30}
                sx={{
                    "& .MuiInputBase-root": {
                        height: "auto!important",
                    },
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                        padding: 1,
                    },
                    minHeight: "700px",
                }}
            />
        </>
    ) : null;
};

const DescriptionSection: React.FC = () => {
    const { t } = useTranslation();
    const { setValue, watch } = useFormContext();

    const [chatTextEN, setChatTextEN] = useState("");
    const [chatTextGR, setChatTextGR] = useState("");
    const [generateDescription, { isLoading }] =
        useGenerateDescriptionMutation();

    const generateCallback = useCallback(
        async (d: IOpenAIDetailsPOST) => generateDescription(d).unwrap(),
        []
    );

    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );

    // --- Initial State ---
    useInitialDescriptionState(setEditorState);

    // ---
    const [lang, setLang] = useState<Language>("el");

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
            // NOTE: useDebouncedCallback has memoization errors => use a custom debounce
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

        // convert description (string representing JSON) to JSON and set state
        const contentState = convertFromRaw(JSON.parse(description));
        setEditorState(EditorState.createWithContent(contentState));
    }, []);

    const onChatTextChange = useCallback(
        (s: string) => (lang === "en" ? setChatTextEN(s) : setChatTextGR(s)),
        [lang]
    );

    return (
        <TabbedBox<Language>
            tabs={TABS}
            selected={lang}
            endNode={
                <UpperRightOptions
                    onGenerate={generateCallback}
                    onChatTextChange={onChatTextChange}
                    isLoading={isLoading}
                    lang={lang}
                />
            }
            onSelect={handleTabChange}
            disabled={isLoading}
        >
            <Typography variant="h6" flex={1}>
                {`${t("Title")} (${lang})`}
            </Typography>
            {/* NOTE: RHF does not support dynamic name by default; use key to alleviate this */}
            <RHFTextField fullWidth key={title} name={title} />
            <Typography variant="h6" flex={1}>
                {`${t("Description")} (${lang})`}
            </Typography>
            <DraftEditor
                sx={{
                    minHeight: "200px",
                }}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
            />

            <ChatGPTResult
                lang={lang}
                chatTextEN={chatTextEN}
                chatTextGR={chatTextGR}
            />
        </TabbedBox>
    );
};

export default DescriptionSection;
