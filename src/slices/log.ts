import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { ICustomer, ICustomerPOST } from "src/types/customer";
import {
    IDemand,
    IDemandFilters,
    IDemandFiltersPOST,
    IDemandPOST,
} from "src/types/demand";
import { IPropertyFeatures } from "src/types/features";
import { ILabel } from "src/types/label";
import type { RootState } from "../store";
import { ILogFilter } from "src/types/logs";
interface Filters extends ILogFilter {
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
    },
});
export const {
    //multiple
    setActions,
    setResources,
} = slice.actions;

export const selectResources = ({ logsFilters }: RootState) =>
    logsFilters.filters.resources;
export const selectActions = ({ logsFilters }: RootState) =>
    logsFilters.filters.actions;

export const sumOfChangedProperties = createSelector(
    (state: RootState) => state.logsFilters,
    (filter) => {
        const propertiesToInclude = [
            // multiple
            "resources",
            "actions",
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
export const { reducer } = slice;
