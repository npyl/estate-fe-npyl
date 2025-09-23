import isFalsy from "@/utils/isFalsy";
import getIsControlled from "./getIsControlled";
import {
    useGetNotesByCustomerIdQuery,
    useGetNotesByPropertyIdQuery,
} from "@/services/note";
import { INote } from "@/types/note";
import { useMemo } from "react";
import { LabelResourceType } from "@/types/label";

// --------------------------------------------------------------------

const useCustomerNotes = (resource: LabelResourceType, resourceId?: number) =>
    useGetNotesByCustomerIdQuery(+resourceId!, {
        skip: resource !== "customer" || isFalsy(resourceId),
    }).data;

const usePropertyNotes = (resource: LabelResourceType, resourceId?: number) =>
    useGetNotesByPropertyIdQuery(+resourceId!, {
        skip: resource !== "property" || isFalsy(resourceId),
    }).data;

// --------------------------------------------------------------------

const useNotesControlledUncontrolled = (
    _notes: INote[] = [],
    resource: LabelResourceType,
    resourceId: number = -1
) => {
    const isControlled = getIsControlled(resourceId);
    console.log("IS_CONTROLLED: ", isControlled);

    const customerNotes = useCustomerNotes(resource, resourceId);
    const propertyNotes = usePropertyNotes(resource, resourceId);
    const uncontrolledNotes = useMemo(() => {
        if (isControlled) return [];
        if (resource === "property") return propertyNotes;
        if (resource === "customer") return customerNotes;
        return [];
    }, [isControlled, resource, customerNotes, propertyNotes]);

    return (isControlled ? _notes : uncontrolledNotes) ?? [];
};

export default useNotesControlledUncontrolled;
