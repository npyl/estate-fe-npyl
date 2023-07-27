// slice for property's files: propertyImage, propertyBlueprints, ...

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";
import { IPropertyBlueprint, IPropertyImage } from "src/types/file";

interface propertyFilesState {
	propertyImages: IPropertyImage[];
	propertyBlueprints: IPropertyBlueprint[];
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

			const propertyImages: IPropertyImage[] = payload.propertyImages;

			state.propertyImages = propertyImages.filter((image) => image); // filter nulls

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
		deletePropertyImage(state: propertyFilesState, { payload }): void {
			const imageKey = payload;
			state.propertyImages = state.propertyImages.filter(
				(image) => image.key !== imageKey
			);
		},

		// INFO: traverses list of images and finds the next in the list that doesn't have a url yet and sets it to cdnUrl
		setCdnUrlForNextAvailable(state: propertyFilesState, { payload }): void {
			const cdnUrl = payload;

			for (let i = 0; i < state.propertyImages.length; i++)
				if (state.propertyImages[i] && !state.propertyImages[i].url) {
					state.propertyImages[i].url = cdnUrl;
					break;
				}
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
	deletePropertyImage,
	setCdnUrlForNextAvailable,
	setPropertyBlueprints,

	resetState,
} = slice.actions;

export const selectAll = ({ propertyFiles }: RootState) => propertyFiles;

export const selectPropertyImages = ({ propertyFiles }: RootState) =>
	propertyFiles.propertyImages;
export const selectPropertyBlueprints = ({ propertyFiles }: RootState) =>
	propertyFiles.propertyBlueprints;

export const { reducer } = slice;
