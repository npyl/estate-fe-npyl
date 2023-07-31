import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { ICustomerFilter } from "src/types/customer";

interface Filters extends ICustomerFilter {
    [key: string]: any;
}
interface IFilterProps {
    filters: Filters;
    ids: string[];
}

const initialState: IFilterProps = {
    filters: {
        labels: [],
    },
    ids: [],
};

const slice = createSlice({
    name: "customerFilters",
    initialState,
    reducers: {
        setStatus(state, { payload }) {
            state.filters.status = payload;
            !state.ids.includes("status") && state.ids.push("status");
        },

        // multiple
        setLabels(state, { payload }) {
            state.filters.labels = payload;
            !state.ids.includes("labels") && state.ids.push("labels");
        },

        // general delete
        deleteFilter(state, { payload }) {
            const key = payload;

            if (Array.isArray(state.filters[key])) {
                state.ids =
                    state.filters[key]?.length === 1
                        ? state.ids.filter((id) => id !== key)
                        : state.ids;
            } else state.ids = state.ids.filter((id) => id !== key);

            const initialValue = initialState.filters[payload];
            state.filters[key] = initialValue;
        },

        resetState: () => {
            return initialState;
        },
    },
});

export const {
    // multiple
    setLabels,

    // delete
    deleteFilter,

    // reset
    resetState,
} = slice.actions;

export const selectStatus = ({ customerFilters }: RootState) =>
    customerFilters.filters.status;
export const selectLabels = ({ customerFilters }: RootState) =>
    customerFilters.filters.labels;
export const selectIds = ({ customerFilters }: RootState) =>
    customerFilters.ids;

export const selectAll = ({ customerFilters }: RootState) =>
    customerFilters.filters;

const sumOfChangedProperties = createSelector(
    (state: RootState) => state.filters,
    (filter) => {
        const propertiesToInclude = [
            "status",
            // multiple
            "labels",
        ];

        return propertiesToInclude.reduce(
            (acc, curr) =>
                filter.filters[curr] !== initialState.filters[curr] // ignore default filter values (e.g. yearOfConstruction = 1960)
                    ? Array.isArray(filter.filters[curr])
                        ? filter.filters[curr].length > 0
                            ? acc + 1
                            : acc
                        : filter.filters[curr]
                        ? acc + 1
                        : acc
                    : acc,
            0
        );
    }
);

export default sumOfChangedProperties;

export const getChangedFields = createSelector(
    (state: RootState) => state.filters,
    (filter) => {
        const changedFields = Object.entries(filter.filters).reduce(
            (acc: any, [key, value]) => {
                if (value !== initialState.filters[key]) {
                    acc[key] = value;
                }
                return acc;
            },
            {}
        );
        return changedFields;
    }
);

export const { reducer } = slice;
