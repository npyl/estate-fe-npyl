import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NoteCreate } from "src/components/Note";
import { addNote, deleteNote, selectAll } from "src/slices/notes";

import { useProfileQuery } from "src/services/user";

const NotesSection: React.FC<any> = (props) => {
  const dispatch = useDispatch();
  const notes = useSelector(selectAll);
  const profile = useProfileQuery({}).data; // current user

  if (!profile) return null;

  const handleAddNote = (message: string) => {
    dispatch(
      addNote({
        content: message,
      })
    );
  };
  const hadleRemove = (index: number) => {
    dispatch(deleteNote(index));
  };

  return (
    <NoteCreate notes={notes} onAdd={handleAddNote} onRemove={hadleRemove} />
  );
};

export default NotesSection;
