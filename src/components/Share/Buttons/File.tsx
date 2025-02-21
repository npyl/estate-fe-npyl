import { FC, useCallback } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { StyledStack } from "./styled";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import errorToast from "@/components/Toaster/error";
import debugLog from "@/_private/debugLog";
import CircularProgress from "@mui/material/CircularProgress";
import useDialog from "@/hooks/useDialog";
import { SxProps, Theme } from "@mui/material";

const ProgressSx: SxProps<Theme> = {
    color: "text.secondary",
};

interface FileButtonProps {
    getter: () => Promise<File[] | null>;
}

const FileButton: FC<FileButtonProps> = ({ getter }) => {
    const { t } = useTranslation();

    const [isLoading, startLoading, stopLoading] = useDialog();

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
            debugLog(ex);
            errorToast("_ERROR_");
        }
    }, []);

    const handleClick = useCallback(async () => {
        startLoading();

        const files = await getter();
        if (!files) return;
        await shareFiles(files);

        stopLoading();
    }, []);

    return (
        <StyledStack onClick={handleClick}>
            <Typography>{t("File(s)")}</Typography>
            {!isLoading ? <AttachFileIcon /> : null}
            {isLoading ? <CircularProgress size={20} sx={ProgressSx} /> : null}
        </StyledStack>
    );
};

export default FileButton;
