import orgToast from "react-hot-toast";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { errorToast, successToast } from "@/components/Toaster";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import instantDismiss from "../instantDismiss";
import { useTranslation } from "react-i18next";

interface UploadMessageProps {
    filename: string;
}

const UploadMessage: FC<UploadMessageProps> = ({ filename }) => {
    const { t } = useTranslation();

    return (
        <Stack direction="row" spacing={1}>
            <CircularProgress size="20px" />
            <Stack>
                <Typography fontWeight="bold" fontSize="16px">
                    {t("Uploading")}
                </Typography>
                <Typography>{filename}</Typography>
            </Stack>
        </Stack>
    );
};

const uploadToast = (filename: string) => {
    const id = orgToast(<UploadMessage filename={filename} />, {
        duration: Infinity,
    });

    const endUploadToast = (success: boolean) => {
        instantDismiss(id);

        if (success) {
            successToast(filename, "_UPLOAD_SUCCESS_TOAST_");
        } else {
            errorToast(filename, "_UPLOAD_FAILURE_TOAST_");
        }
    };

    return { endUploadToast };
};

export default uploadToast;
