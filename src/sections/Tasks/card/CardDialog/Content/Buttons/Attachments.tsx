import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useTranslation } from "react-i18next";
import { ChangeEvent, FC, useCallback } from "react";
import FileInput, { OpenerBaseProps } from "@/components/FileInput";
import { LoadingButton } from "@mui/lab";
import useUploadAttachment from "./useUploadAttachment";
import { attachmentsKey } from "../_constants";
import { useFormContext } from "react-hook-form";

// ------------------------------------------------------------------

const ButtonSx = { bgcolor: "info.dark" };

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

interface AttachmentsProps {
    cardId?: number;
}

const Attachments: FC<AttachmentsProps> = ({ cardId }) => {
    const { upload, isUploading } = useUploadAttachment(cardId);

    const { setValue, watch } = useFormContext();

    const handleChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const fileList = event.target.files;
            if (!fileList) return;

            const files = Array.from(fileList);
            const ids = await upload(files);

            const attachmentIds = watch(attachmentsKey);

            // Create mode: Add id
            if (cardId === undefined) {
                setValue(attachmentsKey, [...attachmentIds, ...ids], {
                    shouldDirty: true,
                });
            }
        },
        [cardId]
    );

    return (
        <FileInput
            loading={isUploading}
            Opener={OpenerButton}
            multiple
            onChange={handleChange}
        />
    );
};

export default Attachments;
