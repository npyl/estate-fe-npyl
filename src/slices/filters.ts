import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IPropertyFilter } from "src/types/properties";

interface IFilterProps extends IPropertyFilter {
  [key: string]: any;
}

const initialState: IFilterProps = {
  filterName: "",
  code: 0,
  minPrice: 0,
  maxPrice: 0,
  minArea: 0,
  maxArea: 0,
  state: "",
  category: "",
  parentCategory: "",
  minBedrooms: 0,
  maxBedrooms: 0,
  minFloor: 0,
  maxFloor: 0,
  minConstructionYear: 0,
  maxConstructionYear: 0,
  heatingType: "",
  frameType: "",
  furnished: "",
  city: "",
  managerId: 0,
  labels: [],
  cities: [],
  states: [],
  categories: [],
  parentCategories: [],
};

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, { payload }) {
      state.parentCategory = payload;
    },
    setSubCategory(state, { payload }) {
      state.category = payload;
    },

    setCity(state, { payload }) {
      state.city = payload;
    },

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

    setState(state, { payload }) {
      state.state = payload;
    },

    // multiple
    setLabels(state, { payload }) {
      state.labels = payload;
    },
    setCities(state, { payload }) {
      state.cities = payload;
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
  setCategory,
  setSubCategory,
  setCity,
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
  setState,

  // multiple
  setLabels,
  setCities,
  setStates,
  setSubCategories,
  setParentCategories,

  deleteSubCategory,
  deleteState,

  deleteFilter,
  resetState,
} = slice.actions;

export const selectCategory = ({ filters }: RootState) =>
  filters.parentCategory;
export const selectSubCategory = ({ filters }: RootState) => filters.category;
export const selectCity = ({ filters }: RootState) => filters.city;
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
export const selectState = ({ filters }: RootState) => filters.state;

export const selectLabels = ({ filters }: RootState) => filters.labels;
export const selectCities = ({ filters }: RootState) => filters.cities;
export const selectStates = ({ filters }: RootState) => filters.states;
export const selectSubCategories = ({ filters }: RootState) =>
  filters.categories;

export const selectParentCategories = ({ filters }: RootState) =>
  filters.parentCategories;

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
      "labels",
      "cities",
      "states",
      "parentCategories",
      "categories",
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
