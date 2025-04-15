import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { NoteCreate } from "src/components/Note";
import {
    useAddNoteToPropertyWithIdMutation,
    useDeleteWithIdMutation,
    useGetNotesByPropertyIdQuery,
} from "src/services/note";
import PanelWithQuickView from "../PanelWithQuickView";

const NotesSection: React.FC = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data } = useGetNotesByPropertyIdQuery(+propertyId!, {
        skip: !propertyId,
    });
    const notes = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    const [addNote] = useAddNoteToPropertyWithIdMutation();
    const [deleteNote] = useDeleteWithIdMutation();

    const handleAddNote = useCallback(
        async (content: string) => {
            const res = await addNote({
                id: +propertyId!,
                dataToSend: { content },
            });
            return !("error" in res);
        },
        [propertyId]
    );

    const hadleRemove = (index: number) =>
        notes && notes[index].id && deleteNote(notes[index].id!);

    if (!propertyId) return null;

    return (
        <PanelWithQuickView hideHeader label="NotesSection">
            <NoteCreate
                notes={notes || []}
                onAdd={handleAddNote}
                onRemove={hadleRemove}
            />
        </PanelWithQuickView>
    );
};

export default NotesSection;
