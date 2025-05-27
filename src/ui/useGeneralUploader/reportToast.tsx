import orgToast, { ToastOptions } from "react-hot-toast";
import { IUploadReport } from "./types";
import { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const getFailed = (name: string) => (
    <Typography key={name} fontWeight="600">
        {name}
    </Typography>
);

interface MessageProps {
    r: IUploadReport;
}

const Message: FC<MessageProps> = ({ r }) => {
    const { t } = useTranslation();

    return (
        <Stack spacing={1}>
            <Typography>{t("UPLOAD_FAILED_FILES")}</Typography>
            <Stack>{r.uploadFails.map(getFailed)}</Stack>
        </Stack>
    );
};

const reportToast = (r: IUploadReport, options?: ToastOptions) =>
    orgToast(<Message r={r} />, { duration: Infinity, ...(options || {}) });

export default reportToast;
