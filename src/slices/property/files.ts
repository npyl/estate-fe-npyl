// slice for property's files: propertyImage, propertyBlueprints, ...

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";
import { IPropertyImage } from "src/types/file";

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
		setInitialState(state: propertyFilesState, { payload }): void {
			//
			// on Edit
			//

			const propertyImage = payload.propertyImage;
			const propertyImages: IPropertyImage[] = payload.propertyImages;

			propertyImage && state.propertyImages.push(propertyImage);

			state.propertyImages = [
				...state.propertyImages,
				...propertyImages.filter((image) => image).map((image) => image.url), // filter nulls
			];

			state.propertyBlueprints = payload.propertyBlueprints.filter(
				(blueprint: any) => blueprint // filter nulls
			);
		},

		setPropertyBlueprints(state: propertyFilesState, { payload }): void {
			state.propertyBlueprints = payload;
		},
		setPropertyImages(state: propertyFilesState, { payload }): void {
			state.propertyImages = payload;
		},
		addPropertyImage(state: propertyFilesState, { payload }): void {
			state.propertyImages.push(payload);
		},

		resetState: () => {
			return initialState;
		},
	},
});

export const {
	setInitialState,

	setPropertyImages,
	addPropertyImage,
	setPropertyBlueprints,

	resetState,
} = slice.actions;

export const selectAll = ({ propertyFiles }: RootState) => propertyFiles;

export const selectPropertyImages = ({ propertyFiles }: RootState) =>
	propertyFiles.propertyImages;
export const selectPropertyBlueprints = ({ propertyFiles }: RootState) =>
	propertyFiles.propertyBlueprints;

export const { reducer } = slice;
