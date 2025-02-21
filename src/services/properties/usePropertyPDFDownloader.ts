import useDialog from "@/hooks/useDialog";
import { useGetPDFQuery } from "@/services/properties";
import { useCallback } from "react";

const baseUrl = `/api/properties/pdf`;

const usePropertyPDFDownloader = (propertyId: number) => {
    const { data, isLoading } = useGetPDFQuery(propertyId);
    const url = data?.url;

    const [isDownloading, startDownloading, stopDownloading] = useDialog();

    const getFile = useCallback(async () => {
        if (!url) return;

        startDownloading();

        const res = await fetch(`${baseUrl}`, {
            method: "POST",
            body: JSON.stringify({ url }),
            headers: {
                "Content-Type": "application/pdf",
            },
        });

        if (!res.ok) return null;

        const blob = await res.blob();
        const fileName = `property-${propertyId}.pdf`;
        const file = new File([blob], fileName, { type: "application/pdf" });

        stopDownloading();

        return file;
    }, [url]);

    return { url, getFile, isLoading, isDownloading };
};

export default usePropertyPDFDownloader;
