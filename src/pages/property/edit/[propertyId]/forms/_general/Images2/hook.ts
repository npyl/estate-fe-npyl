import { useGetPropertyImagesQuery } from "@/services/properties";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { PREVIEW_IMAGES_COUNT } from "./constants";

const usePropertyImages = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data, isLoading } = useGetPropertyImagesQuery(+propertyId!);

    return {
        isLoading,
        propertyId: +propertyId!,
        // ...
        ...useMemo(
            () => ({
                images: Array.isArray(data) ? data : [],
                previewImages: Array.isArray(data)
                    ? data.slice(0, PREVIEW_IMAGES_COUNT)
                    : [],
            }),
            [data, propertyId]
        ),
    };
};

export default usePropertyImages;
