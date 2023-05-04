import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

import { v4 as uuid } from "uuid";

interface ITabsProps {
  title: string;
  path: string;
  uuid: string;
}

const initialState: ITabsProps[] = [
  {
    title: "Properties",
    path: "/",
    uuid: uuid(),
  },
];

const slice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTab: (state, action) => {
      // add a uuid
      action.payload.uuid = uuid();

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
