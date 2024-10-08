import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
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
import { Language } from "@/components/Language/types";
import DraftEditor from "@/components/draft-editor";
import { RHFTextField } from "@/components/hook-form";
import {
    useGenerateDescriptionMutation,
    useImproveDescriptionMutation,
    useLazyGetPropertyByIdQuery,
} from "src/services/properties";
import { IOpenAIDetailsPOST } from "src/types/openai";
import { IProperties } from "src/types/properties";
import ChatGPTIcon from "./GPTIcon";
import TabbedBox from "./TabbedBox";
import { useOpenAIDetails } from "./hooks";
import fixDropdowns from "./stupid";
import useResponsive from "@/hooks/useResponsive";
import { useTranslateMutation } from "@/services/translate";
import { useGlobals } from "@/hooks/useGlobals";

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
    // onImprove: (d: IOpenAIDetailsPOST) => Promise<string>;
    onChatTextChange: (s: string) => void;
    onClickTranslate: () => void;
}

const UpperRightOptions = ({
    onGenerate,
    // onImprove,
    onChatTextChange,
    onClickTranslate,
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

    return (
        <Box display="flex" flexDirection="row" gap={1}>
            {canTranslate ? (
                <Button onClick={onClickTranslate}>
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
    isImproving: boolean;
    onImprove: (selectedOption: string) => void;
}

const ChatGPTResult = ({
    lang,
    chatTextEN,
    chatTextGR,
    isImproving,
    onImprove,
}: ChatGPTResultProps) => {
    const { t } = useTranslation();

    const options = useGlobals();
    const improvementOptions = options?.property?.descriptionImprovementOptions;

    const [selectedOption, setSelectedOption] = useState<string>("PRECISE");

    const handleSelectChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    const handleImproveClick = () => {
        onImprove(selectedOption);
    };

    const text = useMemo(
        () => (lang === "en" ? chatTextEN : chatTextGR),
        [lang, chatTextEN, chatTextGR]
    );

    // Show only if we have something to show
    const show = useMemo(() => !!text, [text]);

    return show ? (
        <>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Typography variant="h6">
                    {`${t("ChatGPT Result")} (${lang})`}
                </Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mb={1}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={1}
                    >
                        <Typography variant="body2" color="textSecondary">
                            {t("Improving the description to be more:")}
                        </Typography>
                        <Select
                            value={selectedOption}
                            onChange={handleSelectChange}
                            displayEmpty
                            variant="outlined"
                            sx={{ minWidth: "100px" }}
                        >
                            {improvementOptions?.map((option) => (
                                <MenuItem key={option.key} value={option.key}>
                                    {t(option.value)}
                                </MenuItem>
                            ))}
                        </Select>
                        <LoadingButton
                            loading={isImproving}
                            loadingPosition="start"
                            startIcon={<ChatGPTIcon />}
                            variant="outlined"
                            onClick={handleImproveClick}
                            sx={{ mt: 0, alignSelf: "flex-end" }}
                        >
                            {isImproving
                                ? t("Improving...")
                                : t("Improve Description")}
                        </LoadingButton>
                    </Stack>
                </Box>
            </Box>

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
    const [generateDescription, { isLoading: isGenerating }] =
        useGenerateDescriptionMutation();

    const [improveDescription, { isLoading: isImproving }] =
        useImproveDescriptionMutation();
    const [generatedDescription, setGeneratedDescription] = useState("");

    const [lang, setLang] = useState<Language>("el");
    const { openAIDetails } = useOpenAIDetails(lang);

    const generateCallback = useCallback(
        async (d: IOpenAIDetailsPOST) => {
            const description = await generateDescription(d).unwrap();
            setGeneratedDescription(description); // Store it for later use as `oldDescription`
            return description;
        },
        [setGeneratedDescription]
    );

    const sanitizePayload = (payload: IOpenAIDetailsPOST) => {
        return Object.fromEntries(
            Object.entries(payload).filter(([_, value]) => value !== "")
        );
    };

    const improveCallback = useCallback(
        async (selectedOption: string) => {
            const sanitizedPayload = sanitizePayload({
                ...openAIDetails,
                oldDescription: generatedDescription, // Use the generated description as oldDescription
                improveOption: selectedOption, // Pass the selected improvement option
            });

            const improvedDescription = await improveDescription(
                sanitizedPayload
            ).unwrap();
            if (lang === "en") {
                setChatTextEN(improvedDescription);
            } else {
                setChatTextGR(improvedDescription);
            }

            return improvedDescription;
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
                    // onImprove={improveCallback}
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
            />
        </TabbedBox>
    );
};

export default DescriptionSection;
