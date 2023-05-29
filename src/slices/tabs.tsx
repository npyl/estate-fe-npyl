import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

import { v5 as uuid } from "uuid";
import crypto from 'crypto';

interface ITabsProps {
  title: string;
  path: string;
  uuid: string;
}

const initialState: ITabsProps[] = [
  {
    title: "Properties",
    path: "/",
    uuid: generateUUIDFromString('/'),
  },
];

// Function to generate a UUID based on a given string
function generateUUIDFromString(inputString: string): string {
  const hash = crypto.createHash('sha256').update(inputString).digest('hex');
  const namespace = '00000000-0000-0000-0000-000000000000'; // Use a custom UUID as the namespace
  return uuid(hash, namespace);
}

const slice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTab: (state, action) => {
      // add a uuid; the path is always different if the functionality is different
      action.payload.uuid = generateUUIDFromString(action.payload.path);

      // check if other object exists with same uuid (nearly impossible)
      if (state.some((obj) => obj.uuid === action.payload.uuid)) {
        return;
      }

      state.push(action.payload);
    },
    deleteTab: (state, action) => {
      return state.filter((item) => item.uuid !== action.payload);
    },
  },
});

export const { addTab, deleteTab } = slice.actions;
export const selectTabs = ({ tabs }: RootState) => tabs;

export const { reducer } = slice;
