import { useRouter } from "next/router";
import { useGetPropertyBlueprintsQuery } from "src/services/properties";
import { useMemo } from "react";

const usePropertyBlueprints = () => {
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

export default usePropertyBlueprints;
