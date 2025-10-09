import { FC } from "react";
import MenuBarButton from "./MenuBarButton";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useEditorContext } from "../context";
import Stack from "@mui/material/Stack";
import { getBorderColor2 } from "@/theme/borderColor";
import { SxProps, Theme } from "@mui/material/styles";
import useCopyToClipboard from "@/components/Editor/hooks/useCopyToClipboard";

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

    const copyToClipboard = useCopyToClipboard(editor);

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
