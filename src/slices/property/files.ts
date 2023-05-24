// slice for property's files: propertyImage, propertyBlueprints, ...

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";

interface propertyFilesState {
  propertyImages: (File | string)[];
  propertyBlueprints: File[];
}

const initialState: propertyFilesState = {
  propertyImages: [],
  propertyBlueprints: [],
};

const slice = createSlice({
  name: "propertyFiles",
  initialState,
  reducers: {
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
