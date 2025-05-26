import { FC, useCallback } from "react";
import { attachmentsKey } from "../_constants";
import { useFormContext, useWatch } from "react-hook-form";
import { useAttachmentsContext } from "./Context";
import UploadTaskAttachment from "./Upload";
import { Box, CircularProgress } from "@mui/material";
import useAttachmentUpload from "@/ui/Tasks/useUploader";

// ------------------------------------------------------------------

interface AttachmentsButtonProps {
    cardId?: number;
}

const AttachmentsButton: FC<AttachmentsButtonProps> = ({ cardId }) => {
    const { setAttachments } = useAttachmentsContext();

    const [upload, { isUploading }] = useAttachmentUpload(cardId);

    const { setValue } = useFormContext();

    const existingIds = useWatch({ name: attachmentsKey });

    const handleFiles = useCallback(
        async (files: File[]) => {
            // BE
            const { ids, res } = await upload(files);

            if (cardId === undefined && ids.length > 0) {
                setAttachments((old) => [...old, ...res]);

                setValue(attachmentsKey, [...existingIds, ...ids], {
                    shouldDirty: true,
                });
            }
        },
        [upload, existingIds, cardId]
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
