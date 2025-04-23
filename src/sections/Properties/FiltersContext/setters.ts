import { Dispatch, SetStateAction, useMemo } from "react";
import { IFilterProps, IFilterStateSetters, TUpdateFilterCb } from "./types";
import { initialState } from "./constant";
import { IPropertyFilter } from "@/types/properties";

type UseSetters = (
    methods: {
        updateFilter: TUpdateFilterCb;
        toggleFilterArray: (key: keyof IPropertyFilter, value: string) => void;
        deleteFilter: (key: keyof IPropertyFilter) => void;
        // ...
        setSorting: (s: string) => void;
        deleteAssigneeUrlParam: () => void;
    },
    setState: Dispatch<SetStateAction<IFilterProps>>
) => IFilterStateSetters;

const useSetters: UseSetters = (
    {
        updateFilter,
        toggleFilterArray,
        deleteFilter,
        setSorting,
        deleteAssigneeUrlParam,
    },
    setState
) =>
    useMemo(
        () => ({
            setLocationSearch: (value) => updateFilter("locationSearch", value),
            setCode: (value) => updateFilter("code", value),
            setManagerId: (value) => {
                deleteAssigneeUrlParam();
                updateFilter("managerId", value);
            },
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

            toggleLifestyleFilter: (key) =>
                setState((prevState) => {
                    // Check if the key exists in extras
                    if (prevState.filters.extras.hasOwnProperty(key)) {
                        // Create a completely new state object with nested structure
                        const newFilters = {
                            ...prevState.filters,
                            extras: {
                                ...prevState.filters.extras,
                                [key]: !prevState.filters.extras[key],
                            },
                        };

                        // Determine if any extras are active after the toggle
                        const anyExtrasActive = Object.values(
                            newFilters.extras
                        ).some((v) => Boolean(v));

                        // Create a new IDs array based on extras status
                        let newIds;
                        if (
                            anyExtrasActive &&
                            !prevState.ids.includes("extras")
                        ) {
                            newIds = [...prevState.ids, "extras"];
                        } else if (
                            !anyExtrasActive &&
                            prevState.ids.includes("extras")
                        ) {
                            newIds = prevState.ids.filter(
                                (id) => id !== "extras"
                            );
                        } else {
                            newIds = [...prevState.ids]; // Create a new array but with same content
                        }

                        // Return completely new state object
                        return {
                            ...prevState,
                            filters: newFilters,
                            ids: newIds,
                        };
                    }

                    // If key doesn't exist, return the previous state (but as a new object to be safe)
                    return { ...prevState };
                }),

            deleteFilter,

            // --------------------------------------------------------------------------------------------
            // Reset
            // --------------------------------------------------------------------------------------------

            resetState: () => {
                deleteAssigneeUrlParam();
                setState(initialState);
            },

            resetBasic: () =>
                setState((prevState) => {
                    const fieldsToReset = [
                        "locationSearch",
                        "code",
                        "managerId",
                        "minPrice",
                        "maxPrice",
                        "minArea",
                        "maxArea",
                        "labels",
                        "active",
                        "regions",
                        "cities",
                    ] as const;

                    const newState = { ...prevState };
                    const newFilters = { ...newState.filters } as any;

                    // Reset each field
                    fieldsToReset.forEach((field) => {
                        newFilters[field] = initialState.filters[field];
                    });

                    // Update state with reset filters
                    newState.filters = newFilters;

                    // Remove reset fields from IDs
                    newState.ids = newState.ids.filter(
                        (id) => !fieldsToReset.includes(id as any)
                    );

                    return newState;
                }),

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

            resetManagerId: () => {
                deleteAssigneeUrlParam();
                deleteFilter("managerId");
            },

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
