import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useTranslation } from "react-i18next";
import { ChangeEvent, FC, useCallback } from "react";
import FileInput, { OpenerBaseProps } from "@/components/FileInput";
import { useFormContext } from "react-hook-form";

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

            const attachments = watch(attachmentsKey);

            // TODO: ... convert filelist to files[] or base64!

            setValue(attachmentsKey, [...attachments, ...files]);
        },
        []
    );

    return <FileInput Opener={OpenerButton} multiple onChange={handleChange} />;
};

export default Attachments;
