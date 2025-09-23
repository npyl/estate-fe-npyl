import isFalsy from "@/utils/isFalsy";
import getIsControlled from "./getIsControlled";
import {
    useGetNotesByCustomerIdQuery,
    useGetNotesByPropertyIdQuery,
} from "@/services/note";
import { INote } from "@/types/note";
import { useMemo } from "react";
import { LabelResourceType } from "@/types/label";
import { useGetCommentsForCardQuery } from "@/services/tasks";
import { TaskCommentToNote } from "@/types/tasks/mapper";

// --------------------------------------------------------------------

const useCustomerNotes = (resource: LabelResourceType, resourceId?: number) =>
    useGetNotesByCustomerIdQuery(+resourceId!, {
        skip: resource !== "customer" || isFalsy(resourceId),
    }).data;

const usePropertyNotes = (resource: LabelResourceType, resourceId?: number) =>
    useGetNotesByPropertyIdQuery(+resourceId!, {
        skip: resource !== "property" || isFalsy(resourceId),
    }).data;

const useTaskComments = (resource: LabelResourceType, resourceId?: number) =>
    useGetCommentsForCardQuery(resourceId!, {
        skip: resource !== "ticket" || isFalsy(resourceId),
    }).data;

// --------------------------------------------------------------------

const useNotesControlledUncontrolled = (
    _notes: INote[] = [],
    resource: LabelResourceType,
    resourceId: number = -1
) => {
    const isControlled = getIsControlled(resourceId);

    const customerNotes = useCustomerNotes(resource, resourceId);
    const propertyNotes = usePropertyNotes(resource, resourceId);
    const taskComments = useTaskComments(resource, resourceId);
    const uncontrolledNotes = useMemo(() => {
        if (isControlled) return [];
        if (resource === "property") return propertyNotes;
        if (resource === "customer") return customerNotes;
        if (resource === "ticket") return taskComments?.map(TaskCommentToNote);
        return [];
    }, [isControlled, resource, customerNotes, propertyNotes, taskComments]);

    return (isControlled ? _notes : uncontrolledNotes) ?? [];
};

export default useNotesControlledUncontrolled;
