import { useMemo } from "react";
import { LabelResourceType } from "src/types/label";
import { useGetLabelsQuery } from "src/services/labels";

const useExistingLabels = (variant: LabelResourceType, skip?: boolean) => {
    const { data } = useGetLabelsQuery(undefined, { skip });

    const existingLabels = useMemo(() => {
        if (variant === "property") return data?.propertyLabels || [];
        if (variant === "customer") return data?.customerLabels || [];
        if (variant === "document") return data?.documentLabels || [];
        if (variant === "ticket") return data?.ticketLabels || [];

        return [];
    }, [data, variant]);

    return existingLabels;
};

export default useExistingLabels;
