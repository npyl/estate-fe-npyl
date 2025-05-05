import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Editor, { EditorRef } from "@/components/Editor";
import { useGetDescription } from "../hooks";
import PanelWithQuickView from "../PanelWithQuickView";
import { useRef } from "react";

const DescriptionSection = () => {
    const { t } = useTranslation();

    const editorRef = useRef<EditorRef>(null);
    const { title } = useGetDescription(editorRef);

    return (
        <PanelWithQuickView hideHeader label="DescriptionSection">
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
                <Typography variant="h6">{t("DescriptionSection")}</Typography>
            </Box>

            <Editor ref={editorRef} editable={false} />
        </PanelWithQuickView>
    );
};

export default DescriptionSection;
