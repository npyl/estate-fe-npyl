import { IPropertyImage } from "@/types/file";
import { useMemo } from "react";

type TImage = string | IPropertyImage;

const getNormalisedUrl = (url: string | null) => {
    if (!url) return "";
    return url.startsWith("https://") ? url : `https://${url}`;
};

const useCarouselImages = (images: TImage[]) =>
    useMemo(
        () =>
            images.map((url, index) => {
                const id = typeof url === "string" ? index : url?.id;
                const actualUrl = typeof url === "string" ? url : url?.url;

                return {
                    id,
                    url: getNormalisedUrl(actualUrl),
                    title: "",
                };
            }),
        [images]
    );

export type { TImage };
export default useCarouselImages;
