import { FC, MouseEvent, useCallback, useLayoutEffect, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { StyledStack } from "./styled";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import errorToast from "@/components/Toaster/error";
import CircularProgress from "@mui/material/CircularProgress";
import useDialog from "@/hooks/useDialog";
import { SxProps, Theme } from "@mui/material";

const ProgressSx: SxProps<Theme> = {
    color: "text.secondary",
};

// --------------------------------------------------------------------------------------

/**
 * Fetches asynchronously the files that we are going to be sharing
 *
 * See: https://medium.com/@julianlannoo/unraveling-user-activation-and-browser-protections-5c229f61ec37
 * As it turns out, the Web Share API is very picky and when we are waiting for intensive tasks it does not allow us to share!
 * Making the fetching asynchronous amends this problem (e.g. for big files like 10mb pdfs)
 * @param getter method to fetch the files
 */
const useAsynchronousFileFetcher = (getter: () => Promise<File[] | null>) => {
    const [isLoading, startLoading, stopLoading] = useDialog();

    const [files, setFiles] = useState<File[]>([]);
    useLayoutEffect(() => {
        const fetchFiles = async () => {
            startLoading();
            const res = await getter();
            if (!res) return;
            setFiles(res);
            stopLoading();
        };

        fetchFiles();
    }, [getter]);

    const isReady = !isLoading && Array.isArray(files) && files.length > 0;

    return { files, isLoading, isReady };
};

// --------------------------------------------------------------------------------------

interface FileButtonProps {
    getter: () => Promise<File[] | null>;
}

const FileButton: FC<FileButtonProps> = ({ getter }) => {
    const { t } = useTranslation();

    const { files, isLoading, isReady } = useAsynchronousFileFetcher(getter);

    const handleClick = useCallback(
        async (e: MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();

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
                console.log(ex);
                errorToast("_ERROR_");
            }
        },
        [files]
    );

    const onClick = isReady ? handleClick : undefined;

    return (
        <StyledStack onClick={onClick}>
            <Typography>{t("File(s)")}</Typography>
            {isReady ? <AttachFileIcon /> : null}
            {isLoading ? <CircularProgress size={20} sx={ProgressSx} /> : null}
        </StyledStack>
    );
};

export default FileButton;
