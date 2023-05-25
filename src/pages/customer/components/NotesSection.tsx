import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NoteCreate } from "src/components/Note";
import { addNote, selectAll } from "src/slices/customer/notes";

import { useProfileQuery } from "src/services/user";

const NotesSection: React.FC<any> = (props) => {
  const dispatch = useDispatch();
  const notes = useSelector(selectAll);
  const profile = useProfileQuery().data; // current user

  if (!profile) return null;

  const handleAddNote = (message: string) => {
    dispatch(
      addNote({
        content: message,
      })
    );
  };

  return <NoteCreate notes={notes} onAdd={handleAddNote} onRemove={() => { }} />;
};

export default NotesSection;
