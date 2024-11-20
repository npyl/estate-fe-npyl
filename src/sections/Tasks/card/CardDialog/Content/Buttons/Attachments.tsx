import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useTranslation } from "react-i18next";
import { ChangeEvent, FC, useCallback, useMemo } from "react";
import FileInput, { OpenerBaseProps } from "@/components/FileInput";
import { useFormContext } from "react-hook-form";
import {
    useAddAttachmentMutation,
    useGetAttachmentsQuery,
} from "@/services/tasks";
import useDialog from "@/hooks/useDialog";
import executeSequentially from "@/utils/executeSequentially";
import { uploadWithProgress } from "@/services/file";

// ------------------------------------------------------------------

const ButtonSx = { bgcolor: "info.dark" };

const OpenerButton: FC<OpenerBaseProps> = ({ onClick }) => {
    const { t } = useTranslation();
    return (
        <Button
            variant="contained"
            sx={ButtonSx}
            startIcon={<AttachFileIcon />}
            onClick={onClick}
        >
            {t("Attach")}
        </Button>
    );
};

// ------------------------------------------------------------------

const useUploadAttachment = (cardId?: number) => {
    const { data } = useGetAttachmentsQuery(cardId!, {
        skip: cardId === undefined,
    });

    const attachmentIds = useMemo(
        () => (Array.isArray(data) ? data : []),
        [data]
    );

    const { setValue } = useFormContext();

    const [addAttachment] = useAddAttachmentMutation(); // BE

    const upload = useCallback(
        async (files: File[]) => {
            const promises = files.map((f) => async () => {
                try {
                    const body = {
                        contentType: f.type,
                        filename: f.name,
                        size: f.size,
                    };

                    const { id, url } = await addAttachment(body).unwrap();

                    await uploadWithProgress(url, f);

                    // Add id
                    setValue(attachmentsKey, [...attachmentIds, id], {
                        shouldDirty: true,
                    });
                } catch (ex) {}
            });

            await executeSequentially(promises);
        },
        [attachmentIds]
    );

    return { upload };
};

// ------------------------------------------------------------------

const attachmentsKey = "attachments";

const Attachments = () => {
    const { upload } = useUploadAttachment();

    const handleChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const fileList = event.target.files;
            if (!fileList) return;

            const files = Array.from(fileList);
            await upload(files);
        },
        []
    );

    return <FileInput Opener={OpenerButton} multiple onChange={handleChange} />;
};

export default Attachments;
