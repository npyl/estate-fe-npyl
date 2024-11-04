import { LoadingButton } from "@mui/lab";
import {
    Box,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import {
    ContentState,
    EditorState,
    convertFromRaw,
    convertFromHTML,
} from "draft-js";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@/components/Language/types";
import DraftEditor from "@/components/draft-editor";
import ChatGPTIcon from "@/assets/icons/GPTIcon";
import { useGlobals } from "@/hooks/useGlobals";

interface ChatGPTResultProps {
    lang: Language;
    chatTextEN: string;
    chatTextGR: string;
    isImproving: boolean;
    scrollRef: React.RefObject<HTMLDivElement>;
    onImprove: (selectedOption: string, styling: boolean) => Promise<string>;
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

    const [editorState, setEditorState] = useState<EditorState>(() =>
        EditorState.createEmpty()
    );

    const handleSelectChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    const handleStylingChange = (event: any) => {
        setStyling(event.target.checked);
    };

    const handleImproveClick = async () => {
        try {
            let contentState: ContentState | null = null;

            const res = await onImprove(selectedOption, styling);

            if (styling) {
                // After we have the HTML, convert it to ContentState
                const blocks = convertFromHTML(res);

                if (!blocks) return;

                contentState = ContentState.createFromBlockArray(
                    blocks.contentBlocks,
                    blocks.entityMap
                );
            } else {
                contentState = ContentState.createFromText(res);
            }

            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
        } catch (error) {
            console.error("Error processing RTF/HTML:", error);
        }
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

export default ChatGPTResult;
