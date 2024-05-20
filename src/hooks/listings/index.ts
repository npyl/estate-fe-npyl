import { useGetPropertyListingsQuery } from "@/services/properties";
import { useRouter } from "next/router";
import { useMemo } from "react";

const usePropertyListings = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const { data: listings } = useGetPropertyListingsQuery(+propertyId!);

    return {
        propertyId,
        ...useMemo(
            () => ({
                publicListings: listings?.publicSites || [],
                restListings: listings?.integrations || [],
            }),
            [listings]
        ),
    };
};

export default usePropertyListings;
