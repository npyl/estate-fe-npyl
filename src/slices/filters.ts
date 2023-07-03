import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IPropertyFilter } from "src/types/properties";

interface IFilterProps extends IPropertyFilter {
  [key: string]: any;
}

const initialState: IFilterProps = {
  minConstructionYear: 1960,
  maxConstructionYear: new Date().getFullYear(),
  parentCategories: [],
  categories: [],
  labels: [],
  states: [],
  cities: [],
  points: [],
};

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCode(state, { payload }) {
      state.code = payload;
    },

    setFrameType(state, { payload }) {
      state.frameType = payload;
    },

    setFurnished(state, { payload }) {
      state.furnished = payload;
    },

    setHeatingType(state, { payload }) {
      state.heatingType = payload;
    },

    setManagerId(state, { payload }) {
      state.managerId = payload;
    },

    setMaxArea(state, { payload }) {
      state.maxArea = payload;
    },

    setMaxBedrooms(state, { payload }) {
      state.maxBedrooms = payload;
    },

    setMaxConstructionYear(state, { payload }) {
      state.maxConstructionYear = payload;
    },

    setMaxFloor(state, { payload }) {
      state.maxFloor = payload;
    },

    setMaxPrice(state, { payload }) {
      state.maxPrice = payload;
    },

    setMinArea(state, { payload }) {
      state.minArea = payload;
    },

    setMinBedrooms(state, { payload }) {
      state.minBedrooms = payload;
    },

    setMinConstructionYear(state, { payload }) {
      state.minConstructionYear = payload;
    },

    setMinFloor(state, { payload }) {
      state.minFloor = payload;
    },

    setMinPrice(state, { payload }) {
      state.minPrice = payload;
    },

    // multiple
    setLabels(state, { payload }) {
      state.labels = payload;
    },
    setParentLocation(state, { payload }) {
      state.parentLocation = payload;
    },
    setSubLocation(state, { payload }) {
      state.subLocation = payload;
    },
    setStates(state, { payload }) {
      state.states = payload;
    },
    setSubCategories(state, { payload }) {
      state.categories = payload;
    },
    setParentCategories(state, { payload }) {
      state.parentCategories = payload;
    },
    deleteSubCategory(state, { payload }) {
      state.categories = state.categories.filter(
        (category) => category !== payload
      );
    },
    deleteState(state, { payload }) {
      state.states = state.states.filter((state) => state !== payload);
    },

    deleteFilter(state, { payload }) {
      const key = payload;
      const initialValue = initialState[payload];
      state[key] = initialValue;
    },

    resetState: () => {
      return initialState;
    },
  },
});

export const {
  setCode,
  setFrameType,
  setFurnished,
  setHeatingType,
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

  // multiple
  setLabels,
  setParentLocation,
  setSubLocation,
  setStates,
  setSubCategories,
  setParentCategories,

  deleteSubCategory,
  deleteState,

  deleteFilter,
  resetState,
} = slice.actions;

export const selectCode = ({ filters }: RootState) => filters.code;
export const selectFrameType = ({ filters }: RootState) => filters.frameType;
export const selectFurnished = ({ filters }: RootState) => filters.furnished;
export const selectHeatingType = ({ filters }: RootState) =>
  filters.heatingType;
export const selectManagerId = ({ filters }: RootState) => filters.managerId;
export const selectMaxArea = ({ filters }: RootState) => filters.maxArea;
export const selectMaxBedrooms = ({ filters }: RootState) =>
  filters.maxBedrooms;
export const selectMaxConstructionYear = ({ filters }: RootState) =>
  filters.maxConstructionYear;
export const selectMaxFloor = ({ filters }: RootState) => filters.maxFloor;
export const selectMaxPrice = ({ filters }: RootState) => filters.maxPrice;
export const selectMinArea = ({ filters }: RootState) => filters.minArea;
export const selectMinBedrooms = ({ filters }: RootState) =>
  filters.minBedrooms;
export const selectMinConstructionYear = ({ filters }: RootState) =>
  filters.minConstructionYear;
export const selectMinFloor = ({ filters }: RootState) => filters.minFloor;
export const selectMinPrice = ({ filters }: RootState) => filters.minPrice;
export const selectParentLocation = ({ filters }: RootState) =>
  filters.parentLocation;
export const selectStates = ({ filters }: RootState) => filters.states;
export const selectParentCategories = ({ filters }: RootState) =>
  filters.parentCategories;
export const selectSubCategories = ({ filters }: RootState) =>
  filters.categories;
export const selectLabels = ({ filters }: RootState) => filters.labels;

export const selectAll = ({ filters }: RootState) => filters;

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
      "heatingType",
      "frameType",
      "furnished",
      "managerId",

      // multiple

      "states",
      "parentCategories",
      "categories",
      "labels",
    ];

    return propertiesToInclude.reduce(
      (acc, curr) =>
        Array.isArray(filter[curr])
          ? filter[curr].length > 0
            ? acc + 1
            : acc
          : filter[curr]
            ? acc + 1
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
        if (value !== initialState[key]) {
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
