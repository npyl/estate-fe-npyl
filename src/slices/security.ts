// slice for property's notes

import { createSlice } from "@reduxjs/toolkit";
import { IRoles } from "src/interfaces/roles";
import { initRoles } from "src/pages/security/components/permission/constants";
import type { RootState } from "src/store";

interface notesState {
    data: IRoles[];
}

const initialState: notesState = {
    data: initRoles,
};

const slice = createSlice({
    name: "securitySlice",
    initialState,
    reducers: {
        setData(state, { payload }) {
            state.data = payload;
        },
    },
});

export const { setData } = slice.actions;

export const selectData = ({ securitySlice }: RootState) => securitySlice.data;

export const { reducer } = slice;
