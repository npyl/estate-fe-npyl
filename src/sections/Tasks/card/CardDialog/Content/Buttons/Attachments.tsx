import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useTranslation } from "react-i18next";
import { ChangeEvent, FC, useCallback } from "react";
import FileInput, { OpenerBaseProps } from "@/components/FileInput";
import { useFormContext } from "react-hook-form";
import fileToBase64 from "@/utils/file-to-base64";

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

const attachmentsKey = "attachments";

const Attachments = () => {
    const { watch, setValue } = useFormContext();

    const handleChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files;
            if (!files) return;

            // TODO: check sizes !!! VERY IMPORTANT !!!

            // convert files to base64 strings
            const filesArray = Array.from(files);
            const base64strs = await Promise.all(filesArray.map(fileToBase64));

            // existing attachments
            const attachments = (watch(attachmentsKey) as string[]) || [];

            setValue(attachmentsKey, [...attachments, ...base64strs], {
                shouldDirty: true,
            });
        },
        []
    );

    return <FileInput Opener={OpenerButton} multiple onChange={handleChange} />;
};

export default Attachments;
