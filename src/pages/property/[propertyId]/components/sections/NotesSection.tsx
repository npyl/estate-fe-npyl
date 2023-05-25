import { useRouter } from "next/router";
import * as React from "react";
import { NoteCreate } from "src/components/Note";
import { useAddNoteToPropertyWithIdMutation, useGetNotesByPropertyIdQuery } from "src/services/note";

const NotesCustomerSection: React.FC = () => {
  const router = useRouter();
  const { propertyId } = router.query;

  const notes = useGetNotesByPropertyIdQuery(
    parseInt(propertyId as string)
  ).data;

  const [addNote, { isSuccess }] = useAddNoteToPropertyWithIdMutation();

  if (!notes || notes.length == 0) return null;

  const handleAddNote = (message: string) => {
    // perform POST
    addNote({
      id: parseInt(propertyId as string),
      dataToSend: { content: message },
    });
  };

  return (
    <NoteCreate notes={notes} onAdd={handleAddNote} onRemove={() => { }} />
  );
};

export default NotesCustomerSection;
