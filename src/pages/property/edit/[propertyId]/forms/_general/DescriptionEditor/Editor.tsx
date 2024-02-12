import { LoadingButton } from "@mui/lab";
import { Tab, Typography } from "@mui/material";
import {
    ContentState,
    EditorState,
    convertFromRaw,
    convertToRaw,
} from "draft-js";
import * as React from "react";
import { useCallback, useEffect, useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { DraftEditor } from "src/components/draft-editor";
import { RHFTextField } from "src/components/hook-form";
import { useGenerateDescriptionMutation } from "src/services/properties";
import { useDebouncedCallback } from "use-debounce";
import { useGetDescription, useOpenAIDetails } from "./hooks";
import ChatGPTIcon from "./GPTIcon";
import fixDropdowns from "./stupid";
import TabbedBox from "./TabbedBox";

const TABS: {
    label: string;
    value: "EN" | "GR";
}[] = [
    { label: "EN", value: "EN" },
    { label: "GR", value: "GR" },
];

const DescriptionSection: React.FC = () => {
    const { t } = useTranslation();
    const { setValue } = useFormContext();

    const { openAIDetails } = useOpenAIDetails();
    const { description } = useGetDescription();

    const [generateDescription, { isLoading }] =
        useGenerateDescriptionMutation();

    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );

    const onEditorStateChange = useCallback((newEditorState: EditorState) => {
        setEditorState(newEditorState);
        debouncedSetDescription(newEditorState);
    }, []);

    useEffect(() => {
        if (!description) return;

        // convert description (string representing JSON) to JSON and set state
        const contentState = convertFromRaw(JSON.parse(description));
        setEditorState(EditorState.createWithContent(contentState));
    }, [description]);

    const debouncedSetDescription = useDebouncedCallback(
        (newEditorState: EditorState) => {
            const contentState = newEditorState.getCurrentContent();
            const plainText = contentState.getPlainText();
            setValue("descriptionText", plainText);

            const contentStateJSON = JSON.stringify(convertToRaw(contentState));
            setValue("description", contentStateJSON);
        },
        100 // the delay in ms
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
        [openAIDetails]
    );

    // --------
    const [lang, setLang] = useState<"EN" | "GR">("GR");

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

    return (
        <Panel label={t("")}>
            <TabbedBox<"EN" | "GR">
                tabs={TABS}
                selected={lang}
                endNode={chatGPTButton}
                onSelect={setLang}
            >
                <Typography variant="h6" flex={1}>
                    {`${t("Title")} (${lang})`}
                </Typography>
                <RHFTextField fullWidth name="title" />
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
