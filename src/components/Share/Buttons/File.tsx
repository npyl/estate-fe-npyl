import { FC, useCallback } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { StyledStack } from "./styled";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import errorToast from "@/components/Toaster/error";

interface FileButtonProps {
    getter: () => Promise<File[] | null>;
}

const FileButton: FC<FileButtonProps> = ({ getter }) => {
    const { t } = useTranslation();

    const shareFiles = useCallback(async (files: File[]) => {
        try {
            const can = window.navigator.canShare({ files });
            if (!can) {
                errorToast("_SHARE_FILE_ERROR_");
                return;
            }

            await navigator.share({
                files,
            });
        } catch (ex) {
            errorToast("_ERROR_");
        }
    }, []);

    const handleClick = useCallback(async () => {
        const files = await getter();
        if (!files) return;
        shareFiles(files);
    }, []);

    return (
        <StyledStack onClick={handleClick}>
            <Typography>{t("File(s)")}</Typography>
            <AttachFileIcon />
        </StyledStack>
    );
};

export default FileButton;
