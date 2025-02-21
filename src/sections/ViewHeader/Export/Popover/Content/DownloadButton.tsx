import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { usePropertyPDFDownloader } from "@/services/properties";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";
import errorToast from "@/components/Toaster/error";
import { toNumberSafe } from "@/utils/toNumber";
import { LoadingButton } from "@mui/lab";
import downloadBlob from "@/utils/downloadBlob";

const DownloadButton = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;
    const iPropertyId = toNumberSafe(propertyId);
    const { url, getFile, isLoading, isDownloading } =
        usePropertyPDFDownloader(iPropertyId);

    const handleDownload = useCallback(async () => {
        if (!url) {
            errorToast("PDF_EXPORT_FAULTY_0", "PDF_EXPORT_FAULTY_1");
            return;
        }

        const file = await getFile();
        if (!file) return;

        downloadBlob(file, "property.pdf");
    }, [url]);

    if (isLoading) return <Skeleton width="100px" height="40px" />;

    return (
        <LoadingButton
            loading={isDownloading}
            disabled={isDownloading}
            variant="contained"
            onClick={handleDownload}
        >
            {t("Download")}
        </LoadingButton>
    );
};

export default DownloadButton;
