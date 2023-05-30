// slice for property's files: propertyImage, propertyBlueprints, ...

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";

interface propertyFilesState {
  propertyImages: string[];
  propertyBlueprints: string[];
}

const initialState: propertyFilesState = {
  propertyImages: [],
  propertyBlueprints: [],
};

const slice = createSlice({
  name: "propertyFiles",
  initialState,
  reducers: {
    setInitialState(state: propertyFilesState, action): void {
      state.propertyImages = action.payload.propertyImages;
      state.propertyBlueprints = action.payload.propertyBlueprints;
    },

    setPropertyBlueprints(state: propertyFilesState, { payload }): void {
      state.propertyBlueprints = payload;
    },
    setPropertyImages(state: propertyFilesState, { payload }): void {
      state.propertyImages = payload;
    },

    resetState: () => {
      return initialState;
    },
  },
});

export const {
  setInitialState,

  setPropertyImages,
  setPropertyBlueprints,

  resetState,
} = slice.actions;

export const selectAll = ({ propertyFiles }: RootState) => propertyFiles;

export const selectPropertyImages = ({ propertyFiles }: RootState) =>
  propertyFiles.propertyImages;
export const selectPropertyBlueprints = ({ propertyFiles }: RootState) =>
  propertyFiles.propertyBlueprints;

export const { reducer } = slice;
