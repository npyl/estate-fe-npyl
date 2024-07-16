import { useRouter } from "next/router";
import {
    useGetPropertyByIdQuery,
    useGetPropertyBlueprintsQuery,
    useGetPropertyDocumentsQuery,
} from "src/services/properties";
import { useMemo } from "react";

export const useGetProperty = () => {
    const { propertyId } = useRouter().query;
    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    return { property };
};

export const usePropertyBlueprints = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data, isLoading } = useGetPropertyBlueprintsQuery(+propertyId!);

    return {
        isLoading,
        propertyId: +propertyId!,
        // ...
        ...useMemo(
            () => ({
                blueprints: Array.isArray(data) ? data : [],
            }),
            [data, propertyId]
        ),
    };
};

export const usePropertyDocuments = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data, isLoading } = useGetPropertyDocumentsQuery(+propertyId!);

    return {
        isLoading,
        propertyId: +propertyId!,
        // ...
        ...useMemo(
            () => ({
                documents: Array.isArray(data) ? data : [],
            }),
            [data, propertyId]
        ),
    };
};
