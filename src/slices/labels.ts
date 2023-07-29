// slice for multiple labels

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import { ILabel } from "src/types/label";

interface labelsState {
    labels: ILabel[];
}

const initialState: labelsState = {
    labels: [],
};

const slice = createSlice({
    name: "labels",
    initialState,
    reducers: {
        addLabel(state: labelsState, { payload }): void {
            state.labels.push(payload);
        },
        removeLabel(state: labelsState, { payload }): void {
            // INFO: removes based on array index (contrary to addLabel)
            const index = payload;
            state.labels = state.labels.filter((_, i) => i !== index);
        },

        resetState: () => {
            return initialState;
        },
    },
});

export const {
    addLabel,
    removeLabel,

    resetState,
} = slice.actions;

export const selectAll = ({ labelsStore }: RootState) => labelsStore.labels;

export const { reducer } = slice;
