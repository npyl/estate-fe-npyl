import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IPropertyFilter } from "src/types/properties";

interface Filters extends IPropertyFilter {
    [key: string]: any;
}
interface IFilterProps {
    filters: Filters;
    ids: string[];
}

const initialState: IFilterProps = {
    filters: {
        locationSearch: undefined,
        parentCategories: [],
        categories: [],
        labels: [],
        states: [],
        regions: [],
        cities: [],
        points: [],
        frameType: [],
        furnished: [],
        heatingType: [],
        active: null,
    },
    ids: [],
};

const slice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setLocationSearch(state, { payload }) {
            state.filters.locationSearch = payload;
            !state.ids.includes("locationSearch") &&
                state.ids.push("locationSearch");
        },
        setCode(state, { payload }) {
            state.filters.code = payload;
            !state.ids.includes("code") && state.ids.push("code");
        },

        setManagerId(state, { payload }) {
            state.filters.managerId = payload;
            !state.ids.includes("managerId") && state.ids.push("managerId");
        },

        setMaxArea(state, { payload }) {
            state.filters.maxArea = payload;
            !state.ids.includes("maxArea") && state.ids.push("maxArea");
        },

        setMaxBedrooms(state, { payload }) {
            state.filters.maxBedrooms = payload;
            !state.ids.includes("maxBedrooms") && state.ids.push("maxBedrooms");
        },

        setMaxConstructionYear(state, { payload }) {
            state.filters.maxConstructionYear = payload;
            !state.ids.includes("maxConstuctionYear") &&
                state.ids.push("maxConstructionYear");
        },

        setMaxFloor(state, { payload }) {
            state.filters.maxFloor = payload;
            !state.ids.includes("maxFloor") && state.ids.push("maxFloor");
        },

        setMaxPrice(state, { payload }) {
            state.filters.maxPrice = payload;
            !state.ids.includes("maxPrice") && state.ids.push("maxPrice");
        },
        setIds(state, { payload }) {
            state.ids = payload;
            !state.ids.includes("ids") && state.ids.push("ids");
        },
        setMinArea(state, { payload }) {
            state.filters.minArea = payload;
            !state.ids.includes("minArea") && state.ids.push("minArea");
        },

        setMinBedrooms(state, { payload }) {
            state.filters.minBedrooms = payload;
            !state.ids.includes("minBedrooms") && state.ids.push("minBedrooms");
        },

        setMinConstructionYear(state, { payload }) {
            state.filters.minConstructionYear = payload;
            !state.ids.includes("minConstructionYear") &&
                state.ids.push("minConstructionYear");
        },

        setMinFloor(state, { payload }) {
            state.filters.minFloor = payload;
            !state.ids.includes("minFloor") && state.ids.push("minFloor");
        },

        setMinPrice(state, { payload }) {
            state.filters.minPrice = payload;
            !state.ids.includes("minPrice") && state.ids.push("minPrice");
        },

        // multiple
        setRegions(state, { payload }) {
            state.filters.regions = payload;
            !state.ids.includes("regions") && state.ids.push("regions");

            // INFO: having [] for payload means we cleared all regions; Therefore, there is no reason to have cities selected
            if (Array.isArray(payload) && payload.length === 0) {
                state.filters.cities = initialState.filters.cities;
                state.ids = state.ids.filter((id) => id !== "cities");
            }
        },
        setCities(state, { payload }) {
            state.filters.cities = payload;
            !state.ids.includes("cities") && state.ids.push("cities");
        },
        setLabels(state, { payload }) {
            state.filters.labels = payload;
            !state.ids.includes("labels") && state.ids.push("labels");
        },
        setParentLocation(state, { payload }) {
            state.filters.parentLocation = payload;
            !state.ids.includes("parentLocation") &&
                state.ids.push("parentLocation");
        },
        setSubLocation(state, { payload }) {
            state.filters.subLocation = payload;
            !state.ids.includes("subLocation") && state.ids.push("subLocation");
        },
        setStates(state, { payload }) {
            state.filters.states = payload;
            !state.ids.includes("states") && state.ids.push("states");
        },
        setSubCategories(state, { payload }) {
            state.filters.categories = payload;
            !state.ids.includes("categories") && state.ids.push("categories");
        },
        setParentCategories(state, { payload }) {
            state.filters.parentCategories = payload;
            !state.ids.includes("parentCategories") &&
                state.ids.push("parentCategories");
        },

        setActiveState(state, { payload }) {
            state.filters.active = payload;
            !state.ids.includes("active") && state.ids.push("active");
        },

        deleteSubCategory(state, { payload }) {
            state.filters.categories.length === 1 &&
                state.ids.filter((id) => id !== payload);
            state.filters.categories = state.filters.categories.filter(
                (category) => category !== payload
            );
        },

        toggleFrameType(state, { payload }) {
            if (state.filters.frameType.includes(payload)) {
                // already exists; remove
                if (state.filters.frameType.length === 1)
                    state.ids = state.ids.filter((id) => id !== "frameType");
                state.filters.frameType = state.filters.frameType.filter(
                    (ft) => ft !== payload
                );
            } else {
                // doesn't exist; add
                state.filters.frameType.push(payload);
                !state.ids.includes("frameType") && state.ids.push("frameType");
            }
        },
        toggleFurnished(state, { payload }) {
            if (state.filters.furnished.includes(payload)) {
                // already exists; remove
                if (state.filters.furnished.length === 1)
                    state.ids = state.ids.filter((id) => id !== "furnished");
                state.filters.furnished = state.filters.furnished.filter(
                    (ft) => ft !== payload
                );
            } else {
                // doesn't exist; add
                state.filters.furnished.push(payload);
                !state.ids.includes("furnished") && state.ids.push("furnished");
            }
        },

        toggleHeatingType(state, { payload }) {
            if (state.filters.heatingType.includes(payload)) {
                // already exists; remove
                if (state.filters.heatingType.length === 1)
                    state.ids = state.ids.filter((id) => id !== "heatingType");
                state.filters.heatingType = state.filters.heatingType.filter(
                    (ft) => ft !== payload
                );
            } else {
                // doesn't exist; add
                state.filters.heatingType.push(payload);
                !state.ids.includes("heatingType") &&
                    state.ids.push("heatingType");
            }
        },

        setPoints: (state, { payload }) => {
            state.filters.points = payload;
        },

        deleteState(state, { payload }) {
            state.filters.states.length === 1 &&
                state.ids.filter((id) => id !== payload);
            state.filters.states = state.filters.states.filter(
                (state) => state !== payload
            );
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

        resetBasic: (state) => {
            state.filters.locationSearch = initialState.filters.locationSearch;
            state.filters.code = initialState.filters.code;
            state.filters.managerId = initialState.filters.managerId;
            state.filters.minPrice = initialState.filters.minPrice;
            state.filters.maxPrice = initialState.filters.maxPrice;
            state.filters.minArea = initialState.filters.minArea;
            state.filters.maxArea = initialState.filters.maxArea;
            state.filters.labels = initialState.filters.labels;
            state.filters.active = initialState.filters.active;
            state.filters.regions = initialState.filters.regions;
            state.filters.cities = initialState.filters.cities;

            state.ids = state.ids.filter((id) => id !== "locationSearch");
            state.ids = state.ids.filter((id) => id !== "minArea");
            state.ids = state.ids.filter((id) => id !== "maxPrice");
            state.ids = state.ids.filter((id) => id !== "minPrice");
            state.ids = state.ids.filter((id) => id !== "managerId");
            state.ids = state.ids.filter((id) => id !== "code");
            state.ids = state.ids.filter((id) => id !== "labels");
            state.ids = state.ids.filter((id) => id !== "active");
            state.ids = state.ids.filter((id) => id !== "regions");
            state.ids = state.ids.filter((id) => id !== "cities");
        },
        resetBedrooms: (state) => {
            state.filters.minBedrooms = initialState.filters.minBedrooms;
            state.filters.maxBedrooms = initialState.filters.maxBedrooms;

            state.ids = state.ids.filter((id) => id !== "minBedrooms");
            state.ids = state.ids.filter((id) => id !== "maxBedrooms");
        },
        resetFloor: (state) => {
            state.filters.minFloor = initialState.filters.minFloor;
            state.filters.maxFloor = initialState.filters.maxFloor;

            state.ids = state.ids.filter((id) => id !== "minFloor");
            state.ids = state.ids.filter((id) => id !== "maxFloor");
        },

        resetStates: (state) => {
            state.filters.states = initialState.filters.states;
            state.ids = state.ids.filter((id) => id !== "states");
        },
        resetCategories: (state) => {
            state.filters.categories = initialState.filters.categories;
            state.ids = state.ids.filter((id) => id !== "categories");
        },
        resetParentCategories: (state) => {
            state.filters.parentCategories =
                initialState.filters.parentCategories;
            state.ids = state.ids.filter((id) => id !== "parentCategories");
        },

        resetFrameType: (state) => {
            state.filters.frameType = initialState.filters.frameType;
            state.ids = state.ids.filter((id) => id !== "frameType");
        },
        resetFurnished: (state) => {
            state.filters.furnished = initialState.filters.furnished;
            state.ids = state.ids.filter((id) => id !== "furnished");
        },
        resetHeatingType: (state) => {
            state.filters.heatingType = initialState.filters.heatingType;
            state.ids = state.ids.filter((id) => id !== "heatingType");
        },
        resetConstructionYear: (state) => {
            state.filters.minConstructionYear =
                initialState.filters.minConstructionYear;
            state.filters.maxConstructionYear =
                initialState.filters.maxConstructionYear;

            state.ids = state.ids.filter((id) => id !== "minConstructionYear");
            state.ids = state.ids.filter((id) => id !== "maxConstructionYear");
        },

        resetPoints: (state) => {
            state.filters.points = initialState.filters.points;
        },

        resetRegions: (state) => {
            state.filters.regions = initialState.filters.regions;
            state.filters.cities = initialState.filters.cities;

            state.ids = state.ids.filter((id) => id !== "regions");
            state.ids = state.ids.filter((id) => id !== "cities");
        },

        resetState: () => {
            return initialState;
        },
        resetLocationSearch: (state) => {
            state.filters.locationSearch = initialState.filters.locationSearch;
            state.ids = state.ids.filter((id) => id !== "locationSearch");
        },

        resetActiveState(state) {
            state.filters.active = initialState.filters.active;
            state.ids = state.ids.filter((id) => id !== "active");
        },
    },
});

export const {
    setLocationSearch,
    setCode,
    toggleFrameType,
    toggleFurnished,
    toggleHeatingType,
    setManagerId,
    setMaxArea,
    setMaxBedrooms,
    setMaxConstructionYear,
    setMaxFloor,
    setMaxPrice,
    setMinArea,
    setMinBedrooms,
    setMinConstructionYear,
    setMinFloor,
    setMinPrice,
    setIds,
    setActiveState,

    // multiple
    setLabels,
    setParentLocation,
    setSubLocation,
    setStates,
    setSubCategories,
    setParentCategories,
    setPoints,
    setRegions,
    setCities,

    // delete
    deleteSubCategory,

    deleteState,
    deleteFilter,

    // reset
    resetLocationSearch,
    resetBasic,
    resetBedrooms,
    resetFloor,
    resetFrameType,
    resetFurnished,
    resetHeatingType,
    resetConstructionYear,
    resetPoints,
    resetState,
    resetActiveState,

    resetStates,
    resetCategories,
    resetParentCategories,

    resetRegions,
} = slice.actions;

export const selectLocationSearch = ({ filters }: RootState) =>
    filters.filters.locationSearch;
export const selectCode = ({ filters }: RootState) => filters.filters.code;
export const selectFrameType = ({ filters }: RootState) =>
    filters.filters.frameType;
export const selectFurnished = ({ filters }: RootState) =>
    filters.filters.furnished;
export const selectHeatingType = ({ filters }: RootState) =>
    filters.filters.heatingType;
export const selectManagerId = ({ filters }: RootState) =>
    filters.filters.managerId;
export const selectMaxArea = ({ filters }: RootState) =>
    filters.filters.maxArea;
export const selectMaxBedrooms = ({ filters }: RootState) =>
    filters.filters.maxBedrooms;
export const selectMaxConstructionYear = ({ filters }: RootState) =>
    filters.filters.maxConstructionYear;
export const selectMaxFloor = ({ filters }: RootState) =>
    filters.filters.maxFloor;
export const selectMaxPrice = ({ filters }: RootState) =>
    filters.filters.maxPrice;
export const selectMinArea = ({ filters }: RootState) =>
    filters.filters.minArea;
export const selectMinBedrooms = ({ filters }: RootState) =>
    filters.filters.minBedrooms;
export const selectMinConstructionYear = ({ filters }: RootState) =>
    filters.filters.minConstructionYear;
export const selectMinFloor = ({ filters }: RootState) =>
    filters.filters.minFloor;
export const selectMinPrice = ({ filters }: RootState) =>
    filters.filters.minPrice;
export const selectParentLocation = ({ filters }: RootState) =>
    filters.filters.parentLocation;
export const selectRegions = ({ filters }: RootState) =>
    filters.filters.regions;
export const selectCities = ({ filters }: RootState) => filters.filters.cities;
export const selectStates = ({ filters }: RootState) => filters.filters.states;
export const selectParentCategories = ({ filters }: RootState) =>
    filters.filters.parentCategories;
export const selectSubCategories = ({ filters }: RootState) =>
    filters.filters.categories;
export const selectLabels = ({ filters }: RootState) => filters.filters.labels;
export const selectIds = ({ filters }: RootState) => filters.ids;
export const selectPoints = ({ filters }: RootState) => filters.filters.points;

export const selectAll = ({ filters }: RootState) => filters.filters;
export const selectActiveState = ({ filters }: RootState) =>
    filters.filters.active;
export const sumOfChangedProperties = createSelector(
    (state: RootState) => state.filters,
    (filter) => {
        const propertiesToInclude = [
            "filterName",
            "code",
            "minPrice",
            "maxPrice",
            "minArea",
            "maxArea",
            "minBedrooms",
            "maxBedrooms",
            "minFloor",
            "maxFloor",
            "minConstructionYear",
            "maxConstructionYear",
            "managerId",
            "active",

            // multiple
            "regions",
            "cities",
            "states",
            "parentCategories",
            "categories",
            "labels",
            "heatingType",
            "frameType",
            "furnished",
            "points",
        ];

        return propertiesToInclude.reduce((acc, curr) => {
            const currentFilterValue = filter.filters[curr];
            const initialFilterValue = initialState.filters[curr];

            if (curr === "active") {
                // Handle the "active" filter explicitly, considering null as "All"
                if (currentFilterValue !== initialFilterValue) {
                    return acc + 1; // Add to the count if activeState changes
                }
                return acc;
            }

            if (currentFilterValue !== initialFilterValue) {
                return Array.isArray(currentFilterValue)
                    ? currentFilterValue.length > 0
                        ? acc + 1
                        : acc
                    : currentFilterValue
                    ? acc + 1
                    : acc;
            }

            return acc;
        }, 0);
    }
);

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
