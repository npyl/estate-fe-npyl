import {
    Box,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { DraftEditor } from "src/components/draft-editor";
import {
    selectDescription,
    selectTitle,
    setDescription,
    setDescriptionText,
    setTitle,
} from "src/slices/property";
import { useDebouncedCallback } from "use-debounce";

const DescriptionSection: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const description = useSelector(selectDescription);
    const title = useSelector(selectTitle);

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
        100 // the delay in ms
    );
    const handleInputChange = (event: any) => {
        const newValue = event.target.value;
        dispatch(setTitle(newValue));
    };
    return (
        <Grid item xs={12} padding={0}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
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
                            <TextField
                                fullWidth
                                value={title}
                                onChange={handleInputChange}
                            />
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
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DescriptionSection;
