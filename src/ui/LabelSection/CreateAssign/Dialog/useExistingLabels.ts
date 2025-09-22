import { useMemo } from "react";
import { LabelResourceType } from "src/types/label";
import { useGetLabelsQuery } from "src/services/labels";

const useExistingLabels = (variant: LabelResourceType) => {
    const { data: labels } = useGetLabelsQuery();

    const existingLabels = useMemo(() => {
        if (variant === "property") return labels?.propertyLabels || [];
        if (variant === "customer") return labels?.customerLabels || [];
        if (variant === "document") return labels?.documentLabels || [];
        if (variant === "ticket") return labels?.ticketLabels || [];

        return [];
    }, [labels, variant]);

    return existingLabels;
};

export default useExistingLabels;
