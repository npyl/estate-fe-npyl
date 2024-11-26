import { Box, Divider, Paper, Typography } from "@mui/material";
import { EditorState, convertFromRaw } from "draft-js";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DraftEditor from "@/components/draft-editor";
import { useGetDescription } from "../hooks";

const DescriptionSection = () => {
    const { t } = useTranslation();

    const { description, title } = useGetDescription();

    const editorState = useMemo(() => {
        if (!description) return EditorState.createEmpty();

        const contentState = convertFromRaw(JSON.parse(description));
        return EditorState.createWithContent(contentState);
    }, [description]);

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
                <Typography variant="body1">{title}</Typography>
            </Box>
            <Divider />
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

            <DraftEditor
                editorState={editorState}
                readOnly
                toolbarHidden
                sx={{ border: "unset" }}
            />
        </Paper>
    );
};

export default DescriptionSection;
