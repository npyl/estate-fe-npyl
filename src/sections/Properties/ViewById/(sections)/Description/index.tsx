import { Box, Divider, SxProps, Theme, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Editor, { EditorRef } from "@/components/Editor";
import { useGetDescription } from "../../hooks";
import { useRef } from "react";
import CopyToClipboard, { CN_COPY_TO_CLIPBOARD } from "./CopyToClipboard";
import PanelWithQuickView from "../../PanelWithQuickView";

const BoxSx: SxProps<Theme> = {
    position: "relative",

    ":hover": {
        [`.${CN_COPY_TO_CLIPBOARD}`]: {
            display: "flex",
        },
    },
};

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
            <Box sx={BoxSx}>
                <Typography variant="h6" px={1.5} py={1}>
                    {t("DescriptionSection")}
                </Typography>

                <CopyToClipboard editorRef={editorRef} />

                <Editor ref={editorRef} editable={false} />
            </Box>
        </PanelWithQuickView>
    );
};

export default DescriptionSection;
