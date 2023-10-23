import {
    selectDescription,
    selectDescriptionText,
    setDescription,
    setDescriptionText,
} from "src/slices/property";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { DraftEditor } from "src/components/draft-editor";
import { useEffect, useMemo, useState } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

const DescriptionSection: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const description = useSelector(selectDescription);
    const descriptionText = useSelector(selectDescriptionText);

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

            dispatch(setDescriptionText(plainText));

            const contentStateJSON = JSON.stringify(convertToRaw(contentState));
            dispatch(setDescription(contentStateJSON));
        },
        300 // the delay in ms
    );

    return (
        <Grid item xs={12} padding={0}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
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
                                editorState={editorState}
                                onEditorStateChange={onEditorStateChange}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DescriptionSection;
