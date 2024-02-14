import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import {
    ContentState,
    EditorState,
    convertFromRaw,
    convertToRaw,
} from "draft-js";
import * as React from "react";
import { useCallback, useState, useMemo, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { DraftEditor } from "src/components/draft-editor";
import { RHFTextField } from "src/components/hook-form";
import {
    useGenerateDescriptionMutation,
    useLazyGetPropertyByIdQuery,
} from "src/services/properties";
import { useOpenAIDetails } from "./hooks";
import ChatGPTIcon from "./GPTIcon";
import fixDropdowns from "./stupid";
import TabbedBox from "./TabbedBox";
import { Language } from "src/components/Language/types";
import { useRouter } from "next/router";
import { IProperties } from "src/types/properties";

const TABS: {
    label: string;
    value: Language;
}[] = [
    { label: "EN", value: "en" },
    { label: "GR", value: "gr" },
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
            ([lang, { description, title }], i) => {
                const state = convertFromRaw(JSON.parse(description));

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

const DescriptionSection: React.FC = () => {
    const { t } = useTranslation();
    const { setValue, watch } = useFormContext();

    const [generateDescription, { isLoading }] =
        useGenerateDescriptionMutation();

    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );

    // --- Initial State ---
    useInitialDescriptionState(setEditorState);

    // ---
    const [lang, setLang] = useState<Language>("en");

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

    const { openAIDetails } = useOpenAIDetails(lang);

    const onEditorStateChange = useCallback(
        (newEditorState: EditorState) => {
            setEditorState(newEditorState);

            const contentState = newEditorState.getCurrentContent();
            const plainText = contentState.getPlainText();
            setValue(name("descriptionText"), plainText);

            const contentStateJSON = JSON.stringify(convertToRaw(contentState));
            setValue(name("description"), contentStateJSON);
        },
        [name]
    );

    const handleGenerate = useCallback(
        () =>
            generateDescription({
                ...openAIDetails,
                ...fixDropdowns(openAIDetails),
            })
                .unwrap()
                .then((s) => {
                    const contentState = ContentState.createFromText(s);
                    const editorState =
                        EditorState.createWithContent(contentState);

                    // update editorState, description & descriptionText
                    onEditorStateChange(editorState);
                }),
        [openAIDetails, onEditorStateChange]
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
                {isLoading ? t("Generating...") : t("Generate Description")}
            </LoadingButton>
        ),
        [isLoading, handleGenerate]
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

    return (
        <Panel label={t("")}>
            <TabbedBox<Language>
                tabs={TABS}
                selected={lang}
                endNode={chatGPTButton}
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
            </TabbedBox>
        </Panel>
    );
};

export default DescriptionSection;
