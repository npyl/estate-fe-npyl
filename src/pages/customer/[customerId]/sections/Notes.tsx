import { useRouter } from "next/router";
import * as React from "react";
import { NoteCreate } from "src/components/Note";
import {
    useAddNoteToCustomerWithIdMutation,
    useDeleteWithIdMutation,
    useGetNotesByCustomerIdQuery,
} from "src/services/note";

const NotesCustomerSection: React.FC = () => {
    const router = useRouter();
    const { customerId } = router.query;

    const notes = useGetNotesByCustomerIdQuery(
        parseInt(customerId as string)
    ).data;
    const [addNote] = useAddNoteToCustomerWithIdMutation();
    const [deleteNote] = useDeleteWithIdMutation();

    const handleAddNote = (message: string) =>
        addNote({ id: +customerId!, dataToSend: { content: message } });

    const hadleRemove = (index: number) =>
        notes && notes[index].id && deleteNote(notes[index].id!);

    if (!customerId) return null;

    return (
        <NoteCreate
            notes={notes || []}
            onAdd={handleAddNote}
            onRemove={hadleRemove}
        />
    );
};

export default NotesCustomerSection;
