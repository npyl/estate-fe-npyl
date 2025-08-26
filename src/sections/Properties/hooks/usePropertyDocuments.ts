import { useRouter } from "next/router";
import { useGetPropertyDocumentsQuery } from "src/services/properties";
import { useMemo } from "react";

const usePropertyDocuments = () => {
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

export default usePropertyDocuments;
