import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

import { v5 as uuid } from "uuid";
import crypto from "crypto";

interface ITabsProps {
    title: string;
    path: string;
    uuid: string;
}

const initialState: ITabsProps[] = [
    {
        title: "Properties",
        path: "/",
        uuid: generateUUIDFromString("/"),
    },
];

// Function to generate a UUID based on a given string
function generateUUIDFromString(inputString: string): string {
    const hash = crypto.createHash("sha256").update(inputString).digest("hex");
    const namespace = "00000000-0000-0000-0000-000000000000"; // Use a custom UUID as the namespace
    return uuid(hash, namespace);
}

const slice = createSlice({
    name: "tabs",
    initialState,
    reducers: {
        deleteSection: (state, action) => {
            delete state[action.payload];
        },
        deleteSectionData: (state, action) => {
            return state.filter((section) => section.uuid !== action.payload);
        },

        addTab: (state, { payload }) => {
            // add a uuid; the path is always different if the functionality is different
            payload.uuid = generateUUIDFromString(payload.path);

            const index = state.findIndex((obj) => obj.uuid === payload.uuid);

            // check if other object exists with same uuid (nearly impossible)
            if (state.some((obj) => obj.uuid === payload.uuid)) {
                // update title only; support changing the title (e.g. when having received property code or customer name)
                state[index].title = payload.title;
                return;
            }

            state.push(payload);
        },
        deleteTab: (state, action) => {
            return state.filter((item) => item.uuid !== action.payload);
        },
        deleteTabWithPath: (state, action) => {
            const path = action.payload;
            const uuid = generateUUIDFromString(path);
            return state.filter((item) => item.uuid !== uuid);
        },
    },
});

export const { addTab, deleteTab, deleteTabWithPath } = slice.actions;
export const selectTabs = ({ tabs }: RootState) => tabs;

export const { reducer } = slice;
export const { deleteSectionData } = slice.actions;
export default slice.reducer;
