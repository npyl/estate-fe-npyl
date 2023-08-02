import { connect } from "react-redux";
import { setDescription } from "src/slices/property";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { DraftEditor } from "src/components/draft-editor";
import { useEffect, useState } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";

interface DescriptionSectionProps {
    description: string;
    setDescription: (description: string) => void;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
    description,
    setDescription,
}) => {
    const { t } = useTranslation();

    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );

    const onEditorStateChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
    };

    useEffect(() => {
        if (!editorState) return;

        // convert currentState (JSON) to string (=> stringify) for description
        const contentState = editorState.getCurrentContent();
        const contentStateJSON = JSON.stringify(convertToRaw(contentState));
        setDescription(contentStateJSON);
    }, [editorState]);

    // first load
    useEffect(() => {
        if (!description) return;

        // convert description (string representing JSON) to JSON and set state
        const contentState = convertFromRaw(JSON.parse(description));
        setEditorState(EditorState.createWithContent(contentState));
    }, []);

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

const mapStateToProps = (state: any) => ({
    description: state.property.description,
});

const mapDispatchToProps = (dispatch: any) => ({
    setDescription: (description: string) =>
        dispatch(setDescription(description)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionSection);
