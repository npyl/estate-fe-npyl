import React, { useEffect, useState } from "react";
import { IProperties } from "src/types/properties";
import { Typography, Box, Paper, Divider, Grid } from "@mui/material";
import { DraftEditor } from "src/components/draft-editor";
import { EditorState, convertFromRaw } from "draft-js";
interface DescriptionSectionProps {
    data: IProperties;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = (props) => {
    const { data } = props;

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        if (!data?.description) return;

        const contentState = convertFromRaw(JSON.parse(data?.description));
        setEditorState(EditorState.createWithContent(contentState));
    }, [data?.description]);

    return (
        <Paper elevation={10} sx={{ overflow: "auto" }}>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">Description</Typography>
            </Box>
            <Divider></Divider>
            <Grid container spacing={0}>
                <Grid item xs={12} order={"row"}>
                    <Box>
                        <Box
                            padding={3}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                borderRadius: 10,
                            }}
                        >
                            <DraftEditor
                                editorState={editorState}
                                readOnly
                                toolbarHidden
                                sx={{ border: "unset" }}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DescriptionSection;
