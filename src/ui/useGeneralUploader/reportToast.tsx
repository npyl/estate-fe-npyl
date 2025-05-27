import orgToast, { ToastOptions } from "react-hot-toast";
import { IUploadReport } from "./types";
import { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "@/components/styled";
import CloseButton from "@/components/Toaster/Message/CloseButton";

const getFailed = (name: string) => <Typography key={name}>{name}</Typography>;

interface MessageProps {
    r: IUploadReport;
}

const Message: FC<MessageProps> = ({ r, ...other }) => {
    const { t } = useTranslation();

    // INFO: onDismiss is automatically passed to every message that is react component (from @/components/Toast)
    const onDismiss =
        "onDismiss" in other ? (other.onDismiss as VoidFunction) : undefined;

    return (
        <Stack spacing={1}>
            <SpaceBetween>
                <Typography fontWeight="bold" fontSize="16px">
                    {t("UPLOAD_FAILED_FILES")}
                </Typography>

                {onDismiss ? <CloseButton /> : null}
            </SpaceBetween>

            <Stack>{r.uploadFails.map(getFailed)}</Stack>
        </Stack>
    );
};

const reportToast = (r: IUploadReport, options?: ToastOptions) =>
    orgToast(<Message r={r} />, { duration: Infinity, ...(options || {}) });

export default reportToast;
