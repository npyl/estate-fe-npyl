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

    resetState: () => {
      return initialState;
    },
  },
});

export const {
  addLabel,

  resetState,
} = slice.actions;

export const selectAll = ({ labelsStore }: RootState) => labelsStore.labels;

export const { reducer } = slice;
