import { Box, Card, CardContent, Typography } from "@mui/material";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import * as React from "react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DraftEditor } from "src/components/draft-editor";
import { RHFTextField } from "src/components/hook-form";
import { useDebouncedCallback } from "use-debounce";

const DescriptionSection: React.FC = () => {
    const { t } = useTranslation();
    const { watch, setValue } = useFormContext();

    const description = watch("description");

    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );

    const onEditorStateChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
        debouncedSetDescription(newEditorState);
    };

    // first load
    useEffect(() => {
        if (!description) return;

        // convert description (string representing JSON) to JSON and set state
        const contentState = convertFromRaw(JSON.parse(description));
        setEditorState(EditorState.createWithContent(contentState));
    }, []);

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

    return (
        <Card>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "grid",
                }}
            >
                <Typography variant="h6" flex={1}>
                    {t("Title")}
                </Typography>
                <RHFTextField fullWidth name="title" />
            </Box>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6" flex={1}>
                    {t("Description")}
                </Typography>
            </Box>
            <CardContent>
                <DraftEditor
                    sx={{
                        minHeight: "104px",
                    }}
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                />
            </CardContent>
        </Card>
    );
};

export default DescriptionSection;
