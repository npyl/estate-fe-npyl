import { useRouter } from "next/router";
import { useMemo } from "react";
import { NoteCreate } from "src/components/Note";
import {
    useAddNoteToPropertyWithIdMutation,
    useDeleteWithIdMutation,
    useGetNotesByPropertyIdQuery,
} from "src/services/note";

const NotesSection: React.FC<any> = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data } = useGetNotesByPropertyIdQuery(+propertyId!, {
        skip: !propertyId,
    });
    const notes = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    const [addNote] = useAddNoteToPropertyWithIdMutation();
    const [deleteNote] = useDeleteWithIdMutation();

    const handleAddNote = (message: string) =>
        addNote({ id: +propertyId!, dataToSend: { content: message } });

    const hadleRemove = (index: number) =>
        notes && notes[index].id && deleteNote(notes[index].id!);

    if (!propertyId) return null;

    return (
        <NoteCreate
            notes={notes || []}
            onAdd={handleAddNote}
            onRemove={hadleRemove}
        />
    );
};

export default NotesSection;
