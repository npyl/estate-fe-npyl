import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

interface ITabsProps {
  title: string;
  path: string;
}

const initialState: ITabsProps[] = [
  {
    title: "Properties",
    path: "/",
  },
];

const slice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTab: (state, action) => {
      if (state.some((obj) => obj.title === action.payload.title)) {
        return;
      }
      state.push(action.payload);
    },
    deleteTab: (state, action) => {
      return state.filter((item) => item.title !== action.payload);
    },
  },
});
export const { addTab, deleteTab } = slice.actions;
export const selectTabs = ({ tabs }: RootState) => tabs;

export const { reducer } = slice;
