import { useMemo } from "react";
import { ILabel, LabelResourceType } from "src/types/label";
import {
    useGetPropertyLabelsQuery,
    useGetPropertyDocumentsQuery,
} from "src/services/properties";
import { useGetCustomerLabelsQuery } from "src/services/customers";
import { useRouter } from "next/router";
import { useGetCardLabelsQuery } from "@/services/tasks";
import useExistingLabels from "@/ui/Label/useExistingLabels";
import getIsControlled from "./getIsControlled";

const usePropertyLabels = (variant: LabelResourceType, resourceId: number) =>
    useGetPropertyLabelsQuery(resourceId, {
        skip: variant !== "property" || resourceId === -1,
    }).data;

const useDocumentLabels = (variant: LabelResourceType, resourceId: number) => {
    const router = useRouter();
    const { propertyId } = router.query;
    return useGetPropertyDocumentsQuery(+propertyId!, {
        skip: variant !== "document",
        selectFromResult: ({ data }) => ({
            data: data?.find((d) => d.id === resourceId)?.labels,
        }),
    }).data;
};

const useCustomerLabels = (variant: LabelResourceType, resourceId: number) =>
    useGetCustomerLabelsQuery(resourceId, {
        skip: variant !== "customer" || resourceId === -1,
    }).data;

const useTasksLabels = (variant: LabelResourceType, resourceId: number) =>
    useGetCardLabelsQuery(resourceId, {
        skip: variant !== "ticket" || resourceId === -1,
    }).data;

const foundIn =
    (assignedLabelIds: number[]) =>
    ({ id }: ILabel) =>
        assignedLabelIds.includes(id);

/**
 * Logic for getting the assigned labels
 * @param resourceId (if -1, we are on a form create mode => use the controlled logic!)
 * @param variant
 * @param assignedLabelIds (should contain ids in case of resourceId === -1)
 * @returns
 */
const useAssignedLabels = (
    resourceId: number = -1,
    variant: LabelResourceType,
    assignedLabelIds: number[]
) => {
    const isControlled = getIsControlled(resourceId);

    //
    // Controlled
    //
    const existingLabels = useExistingLabels(variant, !isControlled);
    const controlledLabels = useMemo(() => {
        // Guard
        if (!isControlled) return [];

        return existingLabels.filter(foundIn(assignedLabelIds));
    }, [assignedLabelIds, isControlled]);

    // ----------------------------------------------------------------
    // Uncontrolled
    // ----------------------------------------------------------------
    const propertyLabels = usePropertyLabels(variant, resourceId);
    const documentLabels = useDocumentLabels(variant, resourceId);
    const customerLabels = useCustomerLabels(variant, resourceId);
    const ticketsLabels = useTasksLabels(variant, resourceId);
    const uncontrolledLabels = useMemo(() => {
        // Guard
        if (isControlled) return [];

        if (variant === "property") return propertyLabels || [];
        if (variant === "customer") return customerLabels || [];
        if (variant === "document") return documentLabels || [];
        if (variant === "ticket") return ticketsLabels || [];

        return [];
    }, [
        isControlled,
        variant,
        // ...
        propertyLabels,
        documentLabels,
        customerLabels,
        ticketsLabels,
    ]);

    return isControlled ? controlledLabels : uncontrolledLabels;
};

export default useAssignedLabels;
