import { FC, useCallback } from "react";
import MenuBarButton from "./MenuBarButton";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useEditorContext } from "../context";
import { infoToast } from "@/components/Toaster";
import Stack from "@mui/material/Stack";
import { getBorderColor2 } from "@/theme/borderColor";
import { SxProps, Theme } from "@mui/material/styles";

const getStackSx = (bubble: boolean): SxProps<Theme> =>
    bubble
        ? {
              left: -55,
              position: "absolute",
              backgroundColor: "background.paper",
              alignItems: "center",
              justifyContent: "center",
              p: 1,

              border: "1px solid",
              borderColor: getBorderColor2,
              borderRadius: "100%",
          }
        : {};

interface CopyProps {
    bubble: boolean;
}

const Copy: FC<CopyProps> = ({ bubble }) => {
    const { editor } = useEditorContext();

    const copyToClipboard = useCallback(async () => {
        try {
            const html = editor.getHTML();
            const text = editor.getText();

            await navigator.clipboard.write([
                new ClipboardItem({
                    "text/html": new Blob([html], { type: "text/html" }),
                    "text/plain": new Blob([text], { type: "text/plain" }),
                }),
            ]);

            infoToast("COPY_TO_CLIPBOARD_SUCCESS");
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <Stack sx={getStackSx(bubble)}>
            <MenuBarButton
                icon={<ContentPasteIcon fontSize="small" />}
                disabled={editor.isEmpty}
                onClick={copyToClipboard}
            />
        </Stack>
    );
};

export default Copy;
