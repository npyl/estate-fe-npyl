// slice for property's notes

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";
import { INote, INotePOST } from "src/types/note";

interface notesState {
  notes: INotePOST[];
  newlyAddIndex: number;
}

const initialState: notesState = {
  notes: [],
  newlyAddIndex: -1,
};

const slice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setInitialState(state: notesState, { payload }): void {
      const notes: INote[] = payload;
      state.notes = notes.map((note) => {
        const newNote: INotePOST = {
          id: note.id ? note.id : undefined,
          content: note.content,
        };
        return newNote;
      });
    },

    addNote(state: notesState, { payload }): void {
      state.notes.push(payload);
      state.newlyAddIndex = state.newlyAddIndex + 1;
    },

    resetState: () => {
      return initialState;
    },
    deleteNote(state: notesState, { payload }): void {
      const index = payload;
      state.notes = state.notes.filter((_, i) => i !== index);
    },
  },
});

export const { setInitialState, addNote, deleteNote, resetState } =
  slice.actions;

export const selectAll = ({ notes }: RootState) => notes.notes;
export const selectNewlyAddedIndex = ({ notes }: RootState) =>
  notes.newlyAddIndex;
export const { reducer } = slice;
