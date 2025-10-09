import { TEditor } from "@/components/Editor";
import useCopyToClipboard from "@/components/Editor/hooks/useCopyToClipboard";
import Button from "@mui/material/Button";
import { FC, RefObject } from "react";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useTranslation } from "react-i18next";
import { SxProps, Theme } from "@mui/material";
import { getBorderColor2 } from "@/theme/borderColor";

const ButtonSx: SxProps<Theme> = {
    display: "none",

    width: "fit-content",

    position: "absolute",
    top: 5,
    right: 5,

    backgroundColor: "background.paper",
    ":hover": {
        backgroundColor: "actions.hover",
    },

    border: "1px solid",
    borderColor: getBorderColor2,
};

const CN_COPY_TO_CLIPBOARD = "cn-copy-to-clipboard";

interface Props {
    editorRef: RefObject<TEditor>;
}

const CopyToClipboard: FC<Props> = ({ editorRef }) => {
    const { t } = useTranslation();
    const copyToClipboard = useCopyToClipboard(editorRef.current);
    return (
        <Button
            fullWidth
            className={CN_COPY_TO_CLIPBOARD}
            startIcon={<ContentPasteIcon fontSize="small" />}
            onClick={copyToClipboard}
            sx={ButtonSx}
        >
            {t("Copy")}
        </Button>
    );
};

export { CN_COPY_TO_CLIPBOARD };
export default CopyToClipboard;
