// slice for property's files: propertyImage, propertyBlueprints, ...

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";
import { INotePOST } from "src/types/note";

interface propertyNotesState {
    notes: INotePOST[]
}

const initialState: propertyNotesState = {
    notes: [],
};

const slice = createSlice({
    name: "propertyNotes",
    initialState,
    reducers: {
        setInitialState(state: propertyNotesState, { payload }): void {
            state.notes = payload;
        },

        addNote(state: propertyNotesState, { payload }): void {
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

export const selectAll = ({ propertyNotes }: RootState) => propertyNotes.notes;

export const { reducer } = slice;
