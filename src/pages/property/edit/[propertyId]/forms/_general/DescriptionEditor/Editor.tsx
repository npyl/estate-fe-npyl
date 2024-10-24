import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
    onGenerate: (d: IOpenAIDetailsPOST, styling: boolean) => Promise<string>;
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
    const [styling, setStyling] = useState(false);

    const belowMd = useResponsive("down", "md");

    const { openAIDetails } = useOpenAIDetails(lang);

    const canTranslate = useMemo(() => lang === "en", [lang]);

    const handleGenerate = useCallback(
        () =>
            onGenerate(
                {
                    ...openAIDetails,
                    styling,
                    ...fixDropdowns(openAIDetails),
                },
                styling
            ).then(onChatTextChange),
        [openAIDetails, styling]
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

    const handleStylingChange = (event: any) => {
        setStyling(event.target.checked);
    };

    return (
        <Box display="flex" flexDirection="row" gap={1}>
            {/* Checkbox for styling */}
            <FormControlLabel
                control={
                    <Checkbox
                        checked={styling}
                        onChange={handleStylingChange}
                        color="primary"
                    />
                }
                label={t("Opt for styled text")}
            />
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
    scrollRef: React.RefObject<HTMLDivElement>;
    onImprove: (selectedOption: string, styling: boolean) => void;
}

const ChatGPTResult = ({
    lang,
    chatTextEN,
    chatTextGR,
    isImproving,
    scrollRef,
    onImprove,
}: ChatGPTResultProps) => {
    const { t } = useTranslation();

    const options = useGlobals();
    const improvementOptions = options?.property?.descriptionImprovementOptions;

    const [selectedOption, setSelectedOption] = useState<string>("PRECISE");
    const [styling, setStyling] = useState(false);
    const [textFieldValue, setTextFieldValue] = useState<string>( // New state for editable text
        lang === "en" ? chatTextEN : chatTextGR
    );

    const [editorState, setEditorState] = useState<EditorState>(() =>
        EditorState.createEmpty()
    );

    const handleSelectChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    const handleStylingChange = (event: any) => {
        setStyling(event.target.checked);
    };

    const handleImproveClick = () => {
        onImprove(selectedOption, styling);
    };

    const text = useMemo(
        () => (lang === "en" ? chatTextEN : chatTextGR),
        [lang, chatTextEN, chatTextGR]
    );

    useEffect(() => {
        if (text) {
            try {
                const content = JSON.parse(text); // Parse as JSON assuming the content is in Raw DraftJS format
                const newContentState = convertFromRaw(content);
                setEditorState(EditorState.createWithContent(newContentState));
            } catch (error) {
                // If text isn't valid JSON, treat it as plain text
                const contentState = ContentState.createFromText(text);
                setEditorState(EditorState.createWithContent(contentState));
            }
        }
    }, [text]);

    const handleEditorStateChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
    };

    // Show only if we have something to show
    const show = useMemo(() => !!text, [text]);

    return show ? (
        <div ref={scrollRef}>
            <Box display="flex" flexDirection="column" mt={1}>
                <Typography variant="h6">
                    {`${t("ChatGPT Result")} (${lang})`}
                </Typography>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            maxWidth={"160px"}
                        >
                            {t("Improving the description to be more:")}
                        </Typography>
                        <Select
                            value={selectedOption}
                            onChange={handleSelectChange}
                            displayEmpty
                            variant="outlined"
                            sx={{ minWidth: "100px", mr: 1 }}
                        >
                            {improvementOptions?.map((option) => (
                                <MenuItem key={option.key} value={option.key}>
                                    {t(option.value)}
                                </MenuItem>
                            ))}
                        </Select>
                        {/* Checkbox for styling */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={styling}
                                    onChange={handleStylingChange}
                                    color="primary"
                                />
                            }
                            label={t("Opt for styled text")}
                        />
                    </Stack>

                    <LoadingButton
                        loading={isImproving}
                        loadingPosition="start"
                        startIcon={<ChatGPTIcon />}
                        variant="outlined"
                        onClick={handleImproveClick}
                        sx={{ mt: 0, justifySelf: "flex-end" }}
                    >
                        {isImproving
                            ? t("Improving...")
                            : t("Improve Description")}
                    </LoadingButton>
                </Stack>
            </Box>

            <DraftEditor
                editorState={editorState}
                onEditorStateChange={handleEditorStateChange}
                sx={{
                    minHeight: "700px",
                    height: "auto",
                }}
            />
        </div>
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

    const resultSectionRef = useRef<HTMLDivElement>(null);

    const generateCallback = useCallback(
        async (d: IOpenAIDetailsPOST) => {
            const description = await generateDescription(d).unwrap();
            setGeneratedDescription(description); // Store it for later use as oldDescription
            // Scroll to the ChatGPT Result section after generation
            if (resultSectionRef.current) {
                resultSectionRef.current.scrollIntoView({ behavior: "smooth" });
            }

            return description;
        },
        [setGeneratedDescription]
    );

    // Effect for scrolling after the chatGPT generation
    useEffect(() => {
        if (generatedDescription && resultSectionRef.current) {
            resultSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [generatedDescription]);

    const sanitizePayload = (payload: IOpenAIDetailsPOST) => {
        return Object.fromEntries(
            Object.entries(payload).filter(([_, value]) => value !== "")
        );
    };

    const improveCallback = useCallback(
        async (selectedOption: string, styling: boolean) => {
            const sanitizedPayload = sanitizePayload({
                ...openAIDetails,
                oldDescription: generatedDescription, // Use the generated description as oldDescription
                improveOption: selectedOption,
                styling, // Pass the selected improvement option
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
                scrollRef={resultSectionRef}
            />
        </TabbedBox>
    );
};

export default DescriptionSection;
