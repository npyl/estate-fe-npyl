import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";

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

export const downloadImages = ({
    propertyId,
    hidden,
}: DownloadImagesZipProps) =>
    fetch(
        `${baseUrl}/${propertyId}/downloadImages?hidden=${!hidden ? "0" : "1"}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer  ${localStorage.getItem("accessToken")}`,
                // Accept: "application/pdf",
            },
        }
    ).then((res) => res.blob());

export const downloadDocuments = (propertyId: number) =>
    fetch(`${baseUrl}/${propertyId}/downloadDocuments`, {
        method: "GET",
        headers: {
            Authorization: `Bearer  ${localStorage.getItem("accessToken")}`,
            // Accept: "application/pdf",
        },
    }).then((res) => res.blob());

export const exportPDF = ({
    propertyId,
    qrPath,
    blueprints,
    publicImages,
    lang,
}: IExportPDF) => {
    const queryParams = new URLSearchParams({
        qrPath,
        blueprints: blueprints.toString(),
        publicImages: publicImages.toString(),
    }).toString();

    return fetch(`${baseUrl}/export/${propertyId}?${queryParams}`, {
        headers: {
            Authorization: `Bearer  ${localStorage.getItem("accessToken")}`,
            "Accept-Language": `${lang}`,
            Accept: "application/pdf",
        },
    }).then((res) => res.blob());
};
