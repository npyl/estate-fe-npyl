import { FC, useCallback } from "react";
import { attachmentsKey } from "../_constants";
import { useFormContext } from "react-hook-form";
import { useAttachmentsContext } from "./Context";
import { IAddAttachmentRes } from "@/services/tasks/types";
import UploadTaskAttachment from "./Upload";
import { Box, CircularProgress } from "@mui/material";
import useAttachmentUpload from "@/ui/Tasks/useUploader";

// ------------------------------------------------------------------

interface AttachmentsButtonProps {
    cardId?: number;
}

const AttachmentsButton: FC<AttachmentsButtonProps> = ({ cardId }) => {
    const { setAttachments } = useAttachmentsContext();

    const handleAdd = useCallback((res: IAddAttachmentRes[]) => {
        setAttachments((old) => [...old, ...res]);
    }, []);

    const [upload, { isUploading }] = useAttachmentUpload(cardId, handleAdd);

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
