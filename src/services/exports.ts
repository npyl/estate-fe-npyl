import useDialog from "@/hooks/useDialog";
import { useCallback } from "react";
import toast from "react-hot-toast";

interface DownloadImagesZipProps {
    hidden: boolean;
    propertyId: number;
}

interface IExportPDF {
    propertyId: number;
    qrPath: string;
    blueprints: boolean;
    publicImages: boolean;
    lang: "en" | "el";
}

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/property`;

const useDownloadImages = () => {
    const [isLoading, startLoading, stopLoading] = useDialog();

    const downloadImages = useCallback(
        async ({ propertyId, hidden }: DownloadImagesZipProps) => {
            try {
                startLoading();

                const res = await fetch(
                    `${baseUrl}/${propertyId}/downloadImages?hidden=${
                        !hidden ? "0" : "1"
                    }`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer  ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                );

                if (!res.ok) throw await res.json();

                return await res.blob();
            } catch (ex) {
                toast.error("Σφάλμα (Error)");
                console.error(ex);
            } finally {
                stopLoading();
            }
        },
        []
    );

    return [downloadImages, { isLoading }] as const;
};

const useDownloadDocuments = () => {
    const [isLoading, startLoading, stopLoading] = useDialog();

    const downloadDocuments = useCallback(async (propertyId: number) => {
        try {
            startLoading();

            const res = await fetch(
                `${baseUrl}/${propertyId}/downloadDocuments`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer  ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            );

            if (!res.ok) throw await res.json();

            return await res.blob();
        } catch (ex) {
            toast.error("Σφάλμα (Error)");
            console.error(ex);
        } finally {
            stopLoading();
        }
    }, []);

    return [downloadDocuments, { isLoading }] as const;
};

const useExportPDF = () => {
    const [isLoading, startLoading, stopLoading] = useDialog();

    const exportPDF = useCallback(
        async ({
            propertyId,
            qrPath,
            blueprints,
            publicImages,
            lang,
        }: IExportPDF) => {
            try {
                startLoading();

                const queryParams = new URLSearchParams({
                    qrPath,
                    blueprints: blueprints.toString(),
                    publicImages: publicImages.toString(),
                }).toString();

                const res = await fetch(
                    `${baseUrl}/export/${propertyId}?${queryParams}`,
                    {
                        headers: {
                            Authorization: `Bearer  ${localStorage.getItem(
                                "accessToken"
                            )}`,
                            "Accept-Language": `${lang}`,
                            Accept: "application/pdf",
                        },
                    }
                );

                if (!res.ok) throw await res.json();

                return await res.blob();
            } catch (ex) {
                toast.error("Σφάλμα (Error)");
                console.error(ex);
            } finally {
                stopLoading();
            }
        },
        []
    );

    return [exportPDF, { isLoading }] as const;
};

export { useDownloadImages, useDownloadDocuments, useExportPDF };
