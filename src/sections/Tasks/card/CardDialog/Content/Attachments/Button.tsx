import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useTranslation } from "react-i18next";
import { FC, useCallback } from "react";
import { OpenerBaseProps } from "@/components/FileInput";
import { LoadingButton } from "@mui/lab";
import useUploadAttachment from "./useUploadAttachment";
import { attachmentsKey } from "../_constants";
import { useFormContext } from "react-hook-form";
import { useAttachmentsContext } from "./Context";
import { IAddAttachmentRes } from "@/services/tasks/types";
import { HideText } from "@/components/styled";
import UploadTaskAttachment from "@/components/upload/UploadTaskAttachment";
import { Box, CircularProgress, Typography } from "@mui/material";

// ------------------------------------------------------------------

const ButtonSx = { bgcolor: "info.dark", ...HideText };

const OpenerButton: FC<OpenerBaseProps> = ({ loading, onClick }) => {
    const { t } = useTranslation();
    return (
        <LoadingButton
            variant="contained"
            loading={loading}
            disabled={loading}
            sx={ButtonSx}
            startIcon={<AttachFileIcon />}
            onClick={onClick}
        >
            {t("Attach")}
        </LoadingButton>
    );
};

// ------------------------------------------------------------------

interface AttachmentsButtonProps {
    cardId?: number;
}

const AttachmentsButton: FC<AttachmentsButtonProps> = ({ cardId }) => {
    const { setAttachments } = useAttachmentsContext();

    const handleAdd = useCallback((res: IAddAttachmentRes[]) => {
        setAttachments((old) => [...old, ...res]);
    }, []);

    const { upload, isUploading } = useUploadAttachment(cardId, handleAdd);

    const { setValue, watch } = useFormContext();

    const handleFiles = useCallback(
        async (files: File[]) => {
            // BE
            const ids = await upload(files);

            //  update form attachments
            const existingIds = watch(attachmentsKey) || [];
            if (cardId === undefined) {
                setValue(attachmentsKey, [...existingIds, ...ids], {
                    shouldDirty: true,
                });
            }
        },
        [upload, cardId, watch, setValue]
    );

    return (
        <>
            {isUploading ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                    minHeight={120}
                >
                    <Typography>Loading...</Typography>
                    <CircularProgress color="primary" size={28} thickness={4} />
                </Box>
            ) : (
                <UploadTaskAttachment
                    onDropAccepted={handleFiles}
                    disabled={isUploading}
                />
            )}
        </>
    );
};

export default AttachmentsButton;
