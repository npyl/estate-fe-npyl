// slice for property's files: propertyImage, propertyBlueprints, ...

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";

import { IFileModel } from "src/types/fileModel";

interface propertyFilesState {
  propertyImages: File[];
  propertyBlueprints: File[];
}

const initialState: propertyFilesState = {
  propertyImages: [],
  propertyBlueprints: [],
};


const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];   // TODO: check if null; remove !
  const bstr = atob(arr[arr.length - 1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  return new File([u8arr], filename, { type: mime });
}

const slice = createSlice({
  name: "propertyFiles",
  initialState,
  reducers: {
    setInitialState(state: propertyFilesState, { payload }): void {
      const mainPropertyImageData: string = payload.mainPropertyImage;                // raw base64 encoded image data e.g. 
      const secondaryPropertyImages: IFileModel[] = payload.secondaryPropertyImages;  // FileModel
      const propertyBlueprints: IFileModel[] = payload.propertyBlueprints;            // FileModel

      // convert image-data to base64-encoded URL
      const mainPropertyImageURL = 'data:image/png;base64,' + mainPropertyImageData;
      const secondaryPropertyImageURLs = secondaryPropertyImages.map((imageData) => 'data:image/png;base64,' + imageData.data);

      // convert everything to File type
      state.propertyImages = [
        dataURLtoFile(mainPropertyImageURL, 'wtvr.png'),
        ...secondaryPropertyImageURLs.map((imageURL) => dataURLtoFile(imageURL, 'wtvr.png'))
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
