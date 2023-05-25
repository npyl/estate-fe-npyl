// slice for customer's notes

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";
import { INotePOST } from "src/types/note";

interface customerNotesState {
    notes: INotePOST[]
}

const initialState: customerNotesState = {
    notes: [],
};

const slice = createSlice({
    name: "customerNotes",
    initialState,
    reducers: {
        setInitialState(state: customerNotesState, { payload }): void {
            state.notes = payload;
        },

        addNote(state: customerNotesState, { payload }): void {
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

export const selectAll = ({ customerNotes }: RootState) => customerNotes.notes;

export const { reducer } = slice;
