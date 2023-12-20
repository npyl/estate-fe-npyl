import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { EditorState, convertFromRaw } from "draft-js";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DraftEditor } from "src/components/draft-editor";
import { IProperties } from "src/types/properties";
interface DescriptionSectionProps {
    data: IProperties;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();

    const editorState = useMemo(() => {
        if (!data?.description) return EditorState.createEmpty();

        const contentState = convertFromRaw(JSON.parse(data?.description));
        return EditorState.createWithContent(contentState);
    }, [data?.description]);

    return (
        <Paper elevation={10} sx={{ overflow: "auto" }}>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "grid",
                    gap: 1,
                }}
            >
                <Typography variant="h6">{t("Title")}</Typography>
                <Typography variant="body1">{data?.title}</Typography>
            </Box>
            <Divider></Divider>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t("Description")}</Typography>
            </Box>

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
