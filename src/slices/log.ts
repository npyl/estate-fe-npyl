import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ILogFilterPOST } from "src/types/logs";

interface Filters extends ILogFilterPOST {
    [key: string]: any;
}

interface IFilterProps {
    filters: Filters;
    ids: string[];
}

const initialState: IFilterProps = {
    filters: {
        resources: [],
        actions: [],
        users: [],
    },
    ids: [],
};

const slice = createSlice({
    name: "logsFilters",
    initialState,
    reducers: {
        //mutiple
        setResources(state, { payload }) {
            state.filters.resources = payload;
            !state.ids.includes("resources") && state.ids.push("resources");
        },
        setActions(state, { payload }) {
            state.filters.actions = payload;
            !state.ids.includes("actions") && state.ids.push("actions");
        },
        setUsers(state, { payload }) {
            state.filters.users = payload;
            !state.ids.includes("users") && state.ids.push("users");
        },
        //start-end
        setFromDate(state, { payload }) {
            state.filters.fromDate = payload;
            !state.ids.includes("fromDate") && state.ids.push("fromDate");
        },
        setToDate(state, { payload }) {
            state.filters.toDate = payload;
            !state.ids.includes("toDate") && state.ids.push("toDate");
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
    //multiple
    setActions,
    setResources,
    //single
    setUsers,
    //start-end
    setFromDate,
    setToDate,
    // delete
    deleteFilter,
} = slice.actions;
//multiple
export const selectResources = ({ logsFilters }: RootState) =>
    logsFilters.filters.resources;
export const selectActions = ({ logsFilters }: RootState) =>
    logsFilters.filters.actions;
export const selectUsers = ({ logsFilters }: RootState) =>
    logsFilters.filters.users;
//single

//start-end
export const selectFromDate = ({ logsFilters }: RootState) =>
    logsFilters.filters.fromDate;
export const selectToDate = ({ logsFilters }: RootState) =>
    logsFilters.filters.toDate;
export const selectIds = ({ logsFilters }: RootState) => logsFilters.ids;
export const selectAll = ({ logsFilters }: RootState) => logsFilters.filters;
export const sumOfChangedProperties = createSelector(
    (state: RootState) => state.logsFilters,
    (filter) => {
        const propertiesToInclude = [
            // multiple
            "resources",
            "actions",
            //single
            "users",
            //start-end
            "fromDate",
            "toDate",
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
    (state: RootState) => state.logsFilters,
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
