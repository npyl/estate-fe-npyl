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
        leaser: false,
        lessor: false,
        buyer: false,
        seller: false,
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
        setLeaser(state, { payload }) {
            state.filters.leaser = payload;
            !state.ids.includes("leaser") && state.ids.push("leaser");
        },
        setLessor(state, { payload }) {
            state.filters.lessor = payload;
            !state.ids.includes("lessor") && state.ids.push("lessor");
        },
        setSeller(state, { payload }) {
            state.filters.seller = payload;
            !state.ids.includes("seller") && state.ids.push("seller");
        },
        setBuyer(state, { payload }) {
            state.filters.buyer = payload;
            !state.ids.includes("buyer") && state.ids.push("buyer");
        },
        setManagerId(state, { payload }) {
            state.filters.managerId = payload;
            !state.ids.includes("managerId") && state.ids.push("managerId");
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
        //min-max
        setMaxPrice(state, { payload }) {
            state.filters.maxPrice = payload;
            !state.ids.includes("maxPrice") && state.ids.push("maxPrice");
        },
        setMinPrice(state, { payload }) {
            state.filters.minPrice = payload;
            !state.ids.includes("minPrice") && state.ids.push("minPrice");
        },
        setMinArea(state, { payload }) {
            state.filters.minCovered = payload;
            !state.ids.includes("minArea") && state.ids.push("minArea");
        },
        setMaxArea(state, { payload }) {
            state.filters.maxCovered = payload;
            !state.ids.includes("maxArea") && state.ids.push("maxArea");
        },
        // resetBasic: (state) => {
        //     state.filters.managerId = initialState.filters.managerId;

        //     state.filters.parentCategories =
        //         initialState.filters.parentCategories;
        //     state.filters.categories = initialState.filters.categories;
        //     state.filters.minPrice = initialState.filters.minPrice;
        //     state.filters.maxPrice = initialState.filters.maxPrice;
        //     state.filters.minArea = initialState.filters.minArea;
        //     state.filters.maxArea = initialState.filters.maxArea;
        //     state.filters.labels = initialState.filters.labels;

        //     state.ids = state.ids.filter((id) => id !== "minArea");
        //     state.ids = state.ids.filter((id) => id !== "maxPrice");
        //     state.ids = state.ids.filter((id) => id !== "minPrice");
        //     state.ids = state.ids.filter((id) => id !== "categories");
        //     state.ids = state.ids.filter((id) => id !== "parentCategory");
        //     state.ids = state.ids.filter((id) => id !== "states");
        //     state.ids = state.ids.filter((id) => id !== "managerId");
        //     state.ids = state.ids.filter((id) => id !== "code");
        //     state.ids = state.ids.filter((id) => id !== "labels");
        // },
        setStates(state, { payload }) {
            state.filters.states = payload;
            !state.ids.includes("states") && state.ids.push("states");
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

        // Reset all filters to initial state
        resetState: () => initialState,
    },
});

export const {
    setManagerId,
    setStates,
    setStatus,
    setBuyer,
    setLeaser,
    setLessor,
    setSeller,
    // multiple
    setLabels,
    setCategories,
    setParentCategories,
    // delete
    deleteFilter,
    //min-max
    setMaxPrice,
    setMinPrice,
    setMinArea,
    setMaxArea,
    // reset
    resetState,
} = slice.actions;

// Selectors
export const selectStatus = ({ customerFilters }: RootState) =>
    customerFilters.filters.status;
export const selectManagerId = ({ customerFilters }: RootState) =>
    customerFilters.filters.managerId;
export const selectStates = ({ customerFilters }: RootState) =>
    customerFilters.filters.states;
export const selectBuyer = ({ customerFilters }: RootState) =>
    customerFilters.filters.buyer;
export const selectLeaser = ({ customerFilters }: RootState) =>
    customerFilters.filters.leaser;
export const selectLessor = ({ customerFilters }: RootState) =>
    customerFilters.filters.lessor;
export const selectSeller = ({ customerFilters }: RootState) =>
    customerFilters.filters.seller;
export const selectLabels = ({ customerFilters }: RootState) =>
    customerFilters.filters.labels;
export const selectParentCategories = ({ customerFilters }: RootState) =>
    customerFilters.filters.parentCategories;
export const selectCategories = ({ customerFilters }: RootState) =>
    customerFilters.filters.categories;
export const selectIds = ({ customerFilters }: RootState) =>
    customerFilters.ids;
//min-max
export const selectMaxPrice = ({ customerFilters }: RootState) =>
    customerFilters.filters.maxPrice;
export const selectMinPrice = ({ customerFilters }: RootState) =>
    customerFilters.filters.minPrice;
export const selectMinArea = ({ customerFilters }: RootState) =>
    customerFilters.filters.minCovered;
export const selectMaxArea = ({ customerFilters }: RootState) =>
    customerFilters.filters.maxCovered;
export const selectAll = ({ customerFilters }: RootState) =>
    customerFilters.filters;

// Calculate number of changed properties
export const sumOfChangedProperties = createSelector(
    (state: RootState) => state.customerFilters,
    (filter) => {
        const propertiesToInclude = [
            "managerId",
            "status",
            "buyer",
            "leaser",
            "seller",
            "lessor",
            // multiple
            "labels",
            "parentCategories",
            "categories",
            //min-max
            "minArea",
            "maxArea",
            "minPrice",
            "maxPrice",
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

// Get changed fields
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
