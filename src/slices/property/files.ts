// slice for property's files: propertyImage, propertyBlueprints, ...

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";

import { IFileModel } from "src/types/fileModel";

interface propertyFilesState {
  propertyImages: string[];             // base64-encoded image url
  propertyBlueprints: string[];         // base64-encoded image url
}

const initialState: propertyFilesState = {
  propertyImages: [],
  propertyBlueprints: [],
};

function base64ToFile(base64Data: string, filename: string, mimeType: string): File {
  const byteCharacters = atob(base64Data);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeType });
  return new File([blob], filename, { type: mimeType });
}

const slice = createSlice({
  name: "propertyFiles",
  initialState,
  reducers: {
    setInitialState(state: propertyFilesState, { payload }): void {
      //
      // on Edit
      //

      const mainPropertyImageData: string = payload.mainPropertyImage;                // raw base64 encoded image data e.g. 
      const secondaryPropertyImages: IFileModel[] = payload.secondaryPropertyImages;  // FileModel
      const propertyBlueprints: IFileModel[] = payload.propertyBlueprints;            // FileModel

      // gather everything up
      state.propertyImages = [
        mainPropertyImageData,
        ...secondaryPropertyImages.map((image) => image.url)
      ];

      // TODO:
      // state.propertyBlueprints = payload.propertyBlueprints;
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
