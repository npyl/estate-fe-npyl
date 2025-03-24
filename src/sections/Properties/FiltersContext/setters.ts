import { Dispatch, SetStateAction, useMemo } from "react";
import { IFilterProps, IFilterStateSetters, TUpdateFilterCb } from "./types";
import { initialState } from "./constant";
import { IPropertyFilter } from "@/types/properties";

type UseSetters = (
    updateFilter: TUpdateFilterCb,
    toggleFilterArray: (key: keyof IPropertyFilter, value: string) => void,
    setState: Dispatch<SetStateAction<IFilterProps>>
) => IFilterStateSetters;

const useSetters: UseSetters = (updateFilter, toggleFilterArray, setState) =>
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
            setRegions: (value) =>
                setState((prevState) => {
                    const newState = { ...prevState };

                    newState.filters = {
                        ...newState.filters,
                        regions: value,
                    };

                    // Add to IDs if not already there
                    if (!newState.ids.includes("regions")) {
                        newState.ids = [...newState.ids, "regions"];
                    }

                    // Clear cities if regions is cleared
                    if (Array.isArray(value) && value.length === 0) {
                        newState.filters.cities = initialState.filters.cities;
                        newState.ids = newState.ids.filter(
                            (id) => id !== "cities"
                        );
                    }

                    return newState;
                }),
            setCities: (value) => updateFilter("cities", value),
            setLabels: (value) => updateFilter("labels", value),
            setStates: (value) => updateFilter("states", value),
            setSubCategories: (value) => updateFilter("categories", value),
            setParentCategories: (value) =>
                updateFilter("parentCategories", value),
            setPoints: (value) => updateFilter("points", value),

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

            deleteFilter: (key) =>
                setState((prevState) => {
                    const newState = { ...prevState };
                    const filterValue = newState.filters[key];

                    // Reset filter to initial value
                    newState.filters = {
                        ...newState.filters,
                        [key]: initialState.filters[key],
                    };

                    // Update IDs
                    if (
                        Array.isArray(filterValue) &&
                        filterValue.length === 1
                    ) {
                        newState.ids = newState.ids.filter((id) => id !== key);
                    } else {
                        newState.ids = newState.ids.filter((id) => id !== key);
                    }

                    return newState;
                }),

            // Reset operations
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
            resetBedrooms: () =>
                setState((prevState) => {
                    const newState = { ...prevState };

                    // Reset bedroom values
                    newState.filters = {
                        ...newState.filters,
                        minBedrooms: initialState.filters.minBedrooms,
                        maxBedrooms: initialState.filters.maxBedrooms,
                    };

                    // Remove from IDs
                    newState.ids = newState.ids.filter(
                        (id) => id !== "minBedrooms" && id !== "maxBedrooms"
                    );

                    return newState;
                }),
            resetFloor: () =>
                setState((prevState) => {
                    const newState = { ...prevState };

                    // Reset floor values
                    newState.filters = {
                        ...newState.filters,
                        minFloor: initialState.filters.minFloor,
                        maxFloor: initialState.filters.maxFloor,
                    };

                    // Remove from IDs
                    newState.ids = newState.ids.filter(
                        (id) => id !== "minFloor" && id !== "maxFloor"
                    );

                    return newState;
                }),

            resetFrameType: () =>
                setState((prevState) => ({
                    ...prevState,
                    filters: {
                        ...prevState.filters,
                        frameType: [...initialState.filters.frameType],
                    },
                    ids: prevState.ids.filter((id) => id !== "frameType"),
                })),

            resetFurnished: () =>
                setState((prevState) => ({
                    ...prevState,
                    filters: {
                        ...prevState.filters,
                        furnished: Array.isArray(initialState.filters.furnished)
                            ? [...initialState.filters.furnished]
                            : initialState.filters.furnished,
                    },
                    ids: prevState.ids.filter((id) => id !== "furnished"),
                })),

            resetHeatingType: () =>
                setState((prevState) => ({
                    ...prevState,
                    filters: {
                        ...prevState.filters,
                        heatingType: Array.isArray(
                            initialState.filters.heatingType
                        )
                            ? [...initialState.filters.heatingType]
                            : initialState.filters.heatingType,
                    },
                    ids: prevState.ids.filter((id) => id !== "heatingType"),
                })),

            resetConstructionYear: () =>
                setState((prevState) => {
                    const newState = { ...prevState };

                    // Reset construction year values
                    newState.filters = {
                        ...newState.filters,
                        minConstructionYear:
                            initialState.filters.minConstructionYear,
                        maxConstructionYear:
                            initialState.filters.maxConstructionYear,
                    };

                    // Remove from IDs
                    newState.ids = newState.ids.filter(
                        (id) =>
                            id !== "minConstructionYear" &&
                            id !== "maxConstructionYear"
                    );

                    return newState;
                }),

            resetPoints: () =>
                setState((prevState) => {
                    const newState = {
                        ...prevState,
                        filters: {
                            ...prevState.filters,
                            points: [...initialState.filters.points],
                        },
                    };

                    newState.ids = newState.ids.filter((id) => id !== "points");

                    return newState;
                }),

            resetState: () => setState(initialState),

            resetLocationSearch: () =>
                setState((prevState) => {
                    const newState = { ...prevState };

                    // Reset locationSearch
                    newState.filters.locationSearch =
                        initialState.filters.locationSearch;

                    // Remove from IDs
                    newState.ids = newState.ids.filter(
                        (id) => id !== "locationSearch"
                    );

                    return newState;
                }),
            resetActiveState: () =>
                setState((prevState) => {
                    const newState = { ...prevState };

                    // Reset active state
                    newState.filters.active = initialState.filters.active;

                    // Remove from IDs
                    newState.ids = newState.ids.filter((id) => id !== "active");

                    return newState;
                }),

            resetExtras: () =>
                setState((prevState) => {
                    const newState = {
                        ...prevState,
                        filters: {
                            ...prevState.filters,
                            extras: { ...initialState.filters.extras },
                        },
                    };

                    // Remove from IDs
                    newState.ids = newState.ids.filter((id) => id !== "extras");

                    return newState;
                }),

            resetStates: () =>
                setState((prevState) => {
                    const newState = { ...prevState };

                    // Reset states
                    newState.filters.states = initialState.filters.states;

                    // Remove from IDs
                    newState.ids = newState.ids.filter((id) => id !== "states");

                    return newState;
                }),

            resetCategories: () =>
                setState((prevState) => {
                    const newState = { ...prevState };

                    // Reset categories
                    newState.filters.categories =
                        initialState.filters.categories;

                    // Remove from IDs
                    newState.ids = newState.ids.filter(
                        (id) => id !== "categories"
                    );

                    return newState;
                }),

            resetParentCategories: () =>
                setState((prevState) => {
                    const newState = { ...prevState };

                    // Reset parentCategories
                    newState.filters.parentCategories =
                        initialState.filters.parentCategories;

                    // Remove from IDs
                    newState.ids = newState.ids.filter(
                        (id) => id !== "parentCategories"
                    );

                    return newState;
                }),

            resetRegions: () =>
                setState((prevState) => {
                    const newState = {
                        ...prevState,
                        filters: {
                            ...prevState.filters,
                            regions: [...initialState.filters.regions],
                            cities: [...initialState.filters.cities],
                        },
                    };

                    // Remove from IDs
                    newState.ids = newState.ids.filter(
                        (id) => id !== "regions" && id !== "cities"
                    );

                    return newState;
                }),

            // Other state setters
            setActiveState: (value) => updateFilter("active", value),

            setSorting: (value) =>
                setState((prevState) => ({
                    ...prevState,
                    sorting: value,
                })),

            setIds: (value) =>
                setState((prevState) => ({
                    ...prevState,
                    ids: value,
                })),
        }),
        []
    );

export default useSetters;
