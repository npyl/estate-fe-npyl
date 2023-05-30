// slice for property's notes

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";
import { INote, INotePOST } from "src/types/note";

interface notesState {
    notes: INotePOST[]
}

const initialState: notesState = {
    notes: [],
};

const slice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setInitialState(state: notesState, { payload }): void {
            const notes: INote[] = payload;
            state.notes = notes.map((note) => {
                const newNote: INotePOST = { id: note.id ? note.id : undefined, content: note.content };
                return newNote;
            });
        },

        addNote(state: notesState, { payload }): void {
            state.notes.push(payload)
        },

        resetState: () => {
            return initialState;
        },
    },
});

export const {
    setInitialState,
    addNote,
    resetState,
} = slice.actions;

export const selectAll = ({ notes }: RootState) => notes.notes;

export const { reducer } = slice;
