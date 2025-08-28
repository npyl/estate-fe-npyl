import { Dispatch, SetStateAction, useMemo } from "react";
import {
    IFilterProps,
    IFilterStateSetters,
    TUpdateFilterCb,
} from "@/sections/Properties/FiltersContext/types";
import { initialState } from "@/sections/Properties/FiltersContext/constant";
import { IPropertyFilter } from "@/types/properties";
import calculateReset from "./calculateReset";
import calculateLifestyle from "./calculateLifestyle";

type UseSetters = (
    methods: {
        updateFilter: TUpdateFilterCb;
        toggleFilterArray: (key: keyof IPropertyFilter, value: string) => void;
        deleteFilter: (key: keyof IPropertyFilter) => void;
        // ...
        setSorting: (s: string) => void;
    },
    setState: Dispatch<SetStateAction<IFilterProps>>
) => IFilterStateSetters;

const useSetters: UseSetters = (
    { updateFilter, toggleFilterArray, deleteFilter, setSorting },
    setState
) =>
    useMemo(
        () => ({
            setLocationSearch: (value) => updateFilter("locationSearch", value),
            setCode: (value) => updateFilter("code", value),
            setManagerId: (value) => updateFilter("managerId", value),
            setMaxArea: (value) => updateFilter("maxArea", value),
            setMinArea: (value) => updateFilter("minArea", value),
            setMaxBedrooms: (value) => updateFilter("maxBedrooms", value),
            setMinBedrooms: (value) => updateFilter("minBedrooms", value),
            setMaxConstructionYear: (value) =>
                updateFilter("maxConstructionYear", value),
            setMinConstructionYear: (value) =>
                updateFilter("minConstructionYear", value),
            setMaxFloor: (value) => updateFilter("maxFloor", value),
            setMinFloor: (value) => updateFilter("minFloor", value),
            setMaxPrice: (value) => updateFilter("maxPrice", value),
            setMinPrice: (value) => updateFilter("minPrice", value),

            // Array setters
            setRegions: (value) => {
                updateFilter("regions", value);

                if (Array.isArray(value) && value.length === 0)
                    deleteFilter("cities");
            },

            setCities: (value) => updateFilter("cities", value),
            setLabels: (value) => updateFilter("labels", value),
            setStates: (value) => updateFilter("states", value),
            setSubCategories: (value) => updateFilter("categories", value),
            setParentCategories: (value) =>
                updateFilter("parentCategories", value),
            setPoints: (value) => updateFilter("points", value),
            setIntegrationSites: (v) => updateFilter("integrationSites", v),

            toggleFrameType: (value) => toggleFilterArray("frameType", value),
            toggleFurnished: (value) => toggleFilterArray("furnished", value),
            toggleHeatingType: (value) =>
                toggleFilterArray("heatingType", value),

            toggleLifestyleFilter: (key) => setState(calculateLifestyle(key)),

            deleteFilter,

            // --------------------------------------------------------------------------------------------
            // Reset
            // --------------------------------------------------------------------------------------------

            resetState: () => setState(initialState),

            resetBasic: () => setState(calculateReset),

            resetBedrooms: () => {
                deleteFilter("minBedrooms");
                deleteFilter("maxBedrooms");
            },

            resetFloor: () => {
                deleteFilter("minFloor");
                deleteFilter("maxFloor");
            },

            resetFrameType: () => deleteFilter("frameType"),
            resetFurnished: () => deleteFilter("furnished"),
            resetHeatingType: () => deleteFilter("heatingType"),

            resetConstructionYear: () => {
                deleteFilter("minConstructionYear");
                deleteFilter("maxConstructionYear");
            },

            resetPoints: () => deleteFilter("points"),
            resetLocationSearch: () => deleteFilter("locationSearch"),
            resetActiveState: () => deleteFilter("active"),
            resetExtras: () => deleteFilter("extras"),
            resetStates: () => deleteFilter("states"),
            resetCategories: () => deleteFilter("categories"),
            resetParentCategories: () => deleteFilter("parentCategories"),
            resetManagerId: () => deleteFilter("managerId"),
            resetRegions: () => {
                deleteFilter("cities");
                deleteFilter("regions");
            },

            resetIntegrationSites: () => deleteFilter("integrationSites"),

            // Other state setters
            setActiveState: (value) => updateFilter("active", value),

            setSorting,
        }),
        []
    );

export default useSetters;
