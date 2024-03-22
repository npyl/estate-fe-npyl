import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

interface MiscProps {
    propertyCode: string[]; // one for each demand
}
interface ISetValueForIndex {
    payload: {
        index: number;
        value: string;
    };
}

const initialState: MiscProps = {
    propertyCode: [],
};

const slice = createSlice({
    name: "customerMisc",
    initialState,
    reducers: {
        setPropertyCode(state: MiscProps, action: ISetValueForIndex): void {
            const { index, value } = action.payload;

            if (index > state.propertyCode.length)
                state.propertyCode.push(value);
            else state.propertyCode[index] = value;
        },
        deletePropertyCode(state: MiscProps, action): void {
            const { payload: index } = action;

            // remove the item at the provided index
            state.propertyCode.splice(index, 1);
        },

        resetState: () => {
            return initialState;
        },
    },
});

export const { setPropertyCode, deletePropertyCode, resetState } =
    slice.actions;

export const selectPropertyCode = ({ customerMisc }: RootState) =>
    customerMisc.propertyCode;

export const { reducer } = slice;
