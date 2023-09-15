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
        categories: [],
        parentCategories: [],
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
        setCategories(state, { payload }) {
            state.filters.categories = payload;
            !state.ids.includes("categories") && state.ids.push("categories");
        },
        setParentCategories(state, { payload }) {
            state.filters.parentCategories = payload;
            !state.ids.includes("parentCategories") &&
                state.ids.push("parentCategories");
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

            const initialValue = initialState.filters[key];
            state.filters[key] = initialValue;
        },

        resetState: () => {
            return initialState;
        },
    },
});

export const {
    setStatus,
    // multiple
    setLabels,
    setCategories,
    setParentCategories,
    // delete
    deleteFilter,

    // reset
    resetState,
} = slice.actions;

export const selectStatus = ({ customerFilters }: RootState) =>
    customerFilters.filters.status;
export const selectLabels = ({ customerFilters }: RootState) =>
    customerFilters.filters.labels;
export const selectParentCategories = ({ customerFilters }: RootState) =>
    customerFilters.filters.parentCategories;
export const selectCategories = ({ customerFilters }: RootState) =>
    customerFilters.filters.categories;
export const selectIds = ({ customerFilters }: RootState) =>
    customerFilters.ids;

export const selectAll = ({ customerFilters }: RootState) =>
    customerFilters.filters;

export const sumOfChangedProperties = createSelector(
    (state: RootState) => state.customerFilters,
    (filter) => {
        const propertiesToInclude = [
            "status",
            // multiple
            "labels",
            "parentCategories",
            "categories",
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

export const getChangedFields = createSelector(
    (state: RootState) => state.customerFilters,
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
