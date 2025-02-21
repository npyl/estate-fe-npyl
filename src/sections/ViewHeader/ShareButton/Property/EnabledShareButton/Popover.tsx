import dynamic from "next/dynamic";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useGetProperty } from "@/hooks/property";
import { SharePopoverProps } from "@/components/Share";
import NotGeneratedPlaceholder from "./NotGeneratedPlaceholder";
import { usePropertyPDFDownloader } from "@/services/properties";
const SharePopover = dynamic(() => import("@/components/Share"));

// TODO: update this to handle properties that are:
// 1. published on a different public

const getShareUrl = (lang: string) => (propertyId: number) =>
    `https://www.kopanitsanos.gr/${lang}/property-detail/${propertyId}`;

interface PropertyShareProps extends Omit<SharePopoverProps, "shareUrls"> {}

const PropertyShare: FC<PropertyShareProps> = (props) => {
    const { i18n } = useTranslation();

    const { property, propertyId } = useGetProperty();

    const lang = i18n.language === "en" ? "en" : "gr";
    const shareUrls = [getShareUrl(lang)(propertyId)];

    const isPDFGenerated = Boolean(property?.pdfGeneratedAt);
    const placeholder = isPDFGenerated ? undefined : NotGeneratedPlaceholder;

    const { getFile, isDownloading } = usePropertyPDFDownloader(propertyId);
    const getter = useCallback(async () => {
        const file = await getFile();
        if (!file) return null;
        return [file];
    }, [getFile]);

    return (
        <SharePopover
            {...props}
            shareUrls={shareUrls}
            // ...
            files={isPDFGenerated}
            getFiles={getter}
            FilesPlaceholder={placeholder}
        />
    );
};

export default PropertyShare;
