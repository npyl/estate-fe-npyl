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
    parentCategories: [],
    categories: [],
    labels: [],
    states: [],
    cities: [],
    points: [],
    frameType: [],
    furnished: [],
    heatingType: [],
  },
  ids: [],
};

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCode(state, { payload }) {
      state.filters.code = payload;
      state.ids.push("code");
    },

    setManagerId(state, { payload }) {
      state.filters.managerId = payload;
      state.ids.push("managerId");
    },

    setMaxArea(state, { payload }) {
      state.filters.maxArea = payload;
      state.ids.push("maxArea");
    },

    setMaxBedrooms(state, { payload }) {
      state.filters.maxBedrooms = payload;
      state.ids.push("maxBedrooms");
    },

    setMaxConstructionYear(state, { payload }) {
      state.filters.maxConstructionYear = payload;
      state.ids.push("maxConstructionYear");
    },

    setMaxFloor(state, { payload }) {
      state.filters.maxFloor = payload;
      state.ids.push("maxFloor");
    },

    setMaxPrice(state, { payload }) {
      state.filters.maxPrice = payload;
      state.ids.push("maxPrice");
    },
    setIds(state, { payload }) {
      state.ids = payload;
      state.ids.push("ids");
    },
    setMinArea(state, { payload }) {
      state.filters.minArea = payload;
      state.ids.push("minArea");
    },

    setMinBedrooms(state, { payload }) {
      state.filters.minBedrooms = payload;
      state.ids.push("minBedrooms");
    },

    setMinConstructionYear(state, { payload }) {
      state.filters.minConstructionYear = payload;
      state.ids.push("minConstructionYear");
    },

    setMinFloor(state, { payload }) {
      state.filters.minFloor = payload;
      state.ids.push("minFloor");
    },

    setMinPrice(state, { payload }) {
      state.filters.minPrice = payload;
      state.ids.push("minPrice");
    },

    // multiple
    setLabels(state, { payload }) {
      state.filters.labels = payload;
      state.ids.push("labels");
    },
    setParentLocation(state, { payload }) {
      state.filters.parentLocation = payload;
      state.ids.push("parentLocation");
    },
    setSubLocation(state, { payload }) {
      state.filters.subLocation = payload;
      state.ids.push("subLocation");
    },
    setStates(state, { payload }) {
      state.filters.states = payload;
      state.ids.push("states");
    },
    setSubCategories(state, { payload }) {
      state.filters.categories = payload;
      state.ids.push("categories");
    },
    setParentCategories(state, { payload }) {
      state.filters.parentCategories = payload;
      state.ids.push("parentCategories");
    },
    deleteSubCategory(state, { payload }) {
      state.filters.categories = state.filters.categories.filter(
        (category) => category !== payload
      );
    },

    toggleFrameType(state, { payload }) {
      state.filters.frameType = state.filters.frameType.includes(payload)
        ? state.filters.frameType.filter((o) => payload !== o) // already exists; remove
        : [...state.filters.frameType, payload]; // doesn't exist; add
    },

    toggleFurnished(state, { payload }) {
      state.filters.furnished = state.filters.furnished.includes(payload)
        ? state.filters.furnished.filter((o) => payload !== o) // already exists; remove
        : [...state.filters.furnished, payload]; // doesn't exist; add
    },

    toggleHeatingType(state, { payload }) {
      state.filters.heatingType = state.filters.heatingType.includes(payload)
        ? state.filters.heatingType.filter((o) => payload !== o) // already exists; remove
        : [...state.filters.heatingType, payload]; // doesn't exist; add
    },

    deleteState(state, { payload }) {
      state.filters.states = state.filters.states.filter(
        (state) => state !== payload
      );
    },

    deleteFilter(state, { payload }) {
      const key = payload;
      const initialValue = initialState.filters[payload];
      state.filters[key] = initialValue;
    },

    resetBasic: (state) => {
      state.filters.code = initialState.filters.code;
      state.filters.managerId = initialState.filters.managerId;
      state.filters.states = initialState.filters.states;
      state.filters.parentCategories = initialState.filters.parentCategories;
      state.filters.categories = initialState.filters.categories;
      state.filters.minPrice = initialState.filters.minPrice;
      state.filters.maxPrice = initialState.filters.maxPrice;
      state.filters.minArea = initialState.filters.minArea;
      state.filters.maxArea = initialState.filters.maxArea;
      state.filters.labels = initialState.filters.labels;
    },
    resetBedrooms: (state) => {
      state.filters.minBedrooms = initialState.filters.minBedrooms;
      state.filters.maxBedrooms = initialState.filters.maxBedrooms;
    },
    resetFloor: (state) => {
      state.filters.minFloor = initialState.filters.minFloor;
      state.filters.maxFloor = initialState.filters.maxFloor;
    },
    resetFrameType: (state) => {
      state.filters.frameType = initialState.filters.frameType;
    },
    resetFurnished: (state) => {
      state.filters.furnished = initialState.filters.furnished;
    },
    resetHeatingType: (state) => {
      state.filters.heatingType = initialState.filters.heatingType;
    },
    resetConstructionYear: (state) => {
      state.filters.minConstructionYear =
        initialState.filters.minConstructionYear;
      state.filters.maxConstructionYear =
        initialState.filters.maxConstructionYear;
    },

    resetState: () => {
      return initialState;
    },
  },
});

export const {
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
  // multiple
  setLabels,
  setParentLocation,
  setSubLocation,
  setStates,
  setSubCategories,
  setParentCategories,

  // delete
  deleteSubCategory,
  deleteState,
  deleteFilter,

  // reset
  resetBasic,
  resetBedrooms,
  resetFloor,
  resetFrameType,
  resetFurnished,
  resetHeatingType,
  resetConstructionYear,
  resetState,
} = slice.actions;

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
export const selectStates = ({ filters }: RootState) => filters.filters.states;
export const selectParentCategories = ({ filters }: RootState) =>
  filters.filters.parentCategories;
export const selectSubCategories = ({ filters }: RootState) =>
  filters.filters.categories;
export const selectLabels = ({ filters }: RootState) => filters.filters.labels;
export const selectIds = ({ filters }: RootState) => filters.ids;

export const selectAll = ({ filters }: RootState) => filters.filters;

const sumOfChangedProperties = createSelector(
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

      // multiple

      "states",
      "parentCategories",
      "categories",
      "labels",
      "heatingType",
      "frameType",
      "furnished",
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
    const changedFields = Object.entries(filter).reduce(
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
