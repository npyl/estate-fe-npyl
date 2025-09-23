import isFalsy from "@/utils/isFalsy";
import getIsControlled from "./getIsControlled";
import {
    useGetNotesByCustomerIdQuery,
    useGetNotesByPropertyIdQuery,
} from "@/services/note";
import { INote } from "@/types/note";

// --------------------------------------------------------------------

const useCustomerNotes = (resourceId?: number) =>
    useGetNotesByCustomerIdQuery(+resourceId!, {
        skip: isFalsy(resourceId),
    }).data;

const usePropertyNotes = (resourceId?: number) =>
    useGetNotesByPropertyIdQuery(+resourceId!, {
        skip: !resourceId,
    }).data;

// --------------------------------------------------------------------

const useNotesControlledUncontrolled = (
    _notes: INote[] = [],
    resourceId: number = -1
) => {
    const isControlled = getIsControlled();

    const customerNotes = useCustomerNotes(resourceId);
    const propertyNotes = usePropertyNotes(resourceId);

    return [];
};

export default useNotesControlledUncontrolled;
