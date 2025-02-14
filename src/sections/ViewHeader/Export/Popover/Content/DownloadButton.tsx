import Button from "@mui/material/Button";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useGetPDFQuery } from "@/services/properties";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";
import errorToast from "@/components/Toaster/error";

const DownloadButton = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { t } = useTranslation();

    const { data, isLoading } = useGetPDFQuery(+propertyId!);

    const handleDownload = useCallback(() => {
        if (!data?.url) {
            errorToast("PDF_EXPORT_FAULTY_0", "PDF_EXPORT_FAULTY_1");
            return;
        }

        window.open(data?.url, "_blank");
    }, [data?.url]);

    if (isLoading) return <Skeleton width="100px" height="40px" />;

    return (
        <Button variant="contained" onClick={handleDownload}>
            {t("Download")}
        </Button>
    );
};

export default DownloadButton;
