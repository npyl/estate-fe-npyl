import { useMemo } from "react";
import { LabelResourceType } from "src/types/label";
import {
    useGetPropertyLabelsQuery,
    useGetPropertyDocumentsQuery,
} from "src/services/properties";
import { useGetCustomerLabelsQuery } from "src/services/customers";
import { useRouter } from "next/router";
import { useGetCardLabelsQuery } from "@/services/tasks";

const useAssignedLabels = (
    variant: LabelResourceType,
    resourceId: number = -1
) => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data: propertyLabels } = useGetPropertyLabelsQuery(resourceId, {
        skip: variant !== "property" || resourceId === -1,
    });
    const { data: documentLabels } = useGetPropertyDocumentsQuery(
        +propertyId!,
        {
            skip: variant !== "document",
            selectFromResult: ({ data }) => ({
                data: data?.find((d) => d.id === resourceId)?.labels,
            }),
        }
    );
    const { data: customerLabels } = useGetCustomerLabelsQuery(resourceId, {
        skip: variant !== "customer" || resourceId === -1,
    });

    const { data: ticketsLabels } = useGetCardLabelsQuery(resourceId, {
        skip: variant !== "ticket" || resourceId === -1,
    });

    const assignedLabels = useMemo(() => {
        if (variant === "property") return propertyLabels || [];
        if (variant === "customer") return customerLabels || [];
        if (variant === "document") return documentLabels || [];
        if (variant === "ticket") return ticketsLabels || [];

        return [];
    }, [
        variant,
        propertyLabels,
        documentLabels,
        customerLabels,
        ticketsLabels,
    ]);

    return assignedLabels;
};

export default useAssignedLabels;
