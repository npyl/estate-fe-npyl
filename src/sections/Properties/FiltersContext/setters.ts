import { IPropertyFilter, IPropertyFilterExtras } from "@/types/properties";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IFilterProps, TUpdateFilterCb } from "./types";
import { initialState } from "./constant";

const useSetters = (
    updateFilter: TUpdateFilterCb,
    setState: Dispatch<SetStateAction<IFilterProps>>
) =>
    useMemo(
        () => ({
            setLocationSearch: (value: string | undefined) =>
                updateFilter("locationSearch", value),
            setCode: (value: string | undefined) => updateFilter("code", value),
            setManagerId: (value: string | undefined) =>
                updateFilter("managerId", value),
            setMaxArea: (value: number | undefined) =>
                updateFilter("maxArea", value),
            setMinArea: (value: number | undefined) =>
                updateFilter("minArea", value),
            setMaxBedrooms: (value: number | undefined) =>
                updateFilter("maxBedrooms", value),
            setMinBedrooms: (value: number | undefined) =>
                updateFilter("minBedrooms", value),
            setMaxConstructionYear: (value: number | undefined) =>
                updateFilter("maxConstructionYear", value),
            setMinConstructionYear: (value: number | undefined) =>
                updateFilter("minConstructionYear", value),
            setMaxFloor: (value: number | undefined) =>
                updateFilter("maxFloor", value),
            setMinFloor: (value: number | undefined) =>
                updateFilter("minFloor", value),
            setMaxPrice: (value: number | undefined) =>
                updateFilter("maxPrice", value),
            setMinPrice: (value: number | undefined) =>
                updateFilter("minPrice", value),

            // Array setters
            setRegions: (value: string[]) =>
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
            setCities: (value: string[]) => updateFilter("cities", value),
            setLabels: (value: string[]) => updateFilter("labels", value),
            setStates: (value: string[]) => updateFilter("states", value),
            setSubCategories: (value: string[]) =>
                updateFilter("categories", value),
            setParentCategories: (value: string[]) =>
                updateFilter("parentCategories", value),
            setPoints: (value: any[]) => updateFilter("points", value),

            // Toggle functions
            toggleFrameType: (value: string) =>
                setState((prevState) => {
                    const newState = { ...prevState };
                    const frameTypes = [...newState.filters.frameType];

                    if (frameTypes.includes(value)) {
                        // Remove value
                        const filteredFrameTypes = frameTypes.filter(
                            (ft) => ft !== value
                        );
                        newState.filters.frameType = filteredFrameTypes;

                        // Remove from IDs if empty
                        if (filteredFrameTypes.length === 0) {
                            newState.ids = newState.ids.filter(
                                (id) => id !== "frameType"
                            );
                        }
                    } else {
                        // Add value
                        newState.filters.frameType = [...frameTypes, value];

                        // Add to IDs if not already there
                        if (!newState.ids.includes("frameType")) {
                            newState.ids = [...newState.ids, "frameType"];
                        }
                    }

                    return newState;
                }),

            toggleFurnished: (value: string) =>
                setState((prevState) => {
                    const newState = { ...prevState };
                    const furnished = [...newState.filters.furnished];

                    if (furnished.includes(value)) {
                        // Remove value
                        const filteredFurnished = furnished.filter(
                            (f) => f !== value
                        );
                        newState.filters.furnished = filteredFurnished;

                        // Remove from IDs if empty
                        if (filteredFurnished.length === 0) {
                            newState.ids = newState.ids.filter(
                                (id) => id !== "furnished"
                            );
                        }
                    } else {
                        // Add value
                        newState.filters.furnished = [...furnished, value];

                        // Add to IDs if not already there
                        if (!newState.ids.includes("furnished")) {
                            newState.ids = [...newState.ids, "furnished"];
                        }
                    }

                    return newState;
                }),
            toggleHeatingType: (value: string) =>
                setState((prevState) => {
                    const newState = { ...prevState };
                    const heatingTypes = [...newState.filters.heatingType];

                    if (heatingTypes.includes(value)) {
                        // Remove value
                        const filteredHeatingTypes = heatingTypes.filter(
                            (ht) => ht !== value
                        );
                        newState.filters.heatingType = filteredHeatingTypes;

                        // Remove from IDs if empty
                        if (filteredHeatingTypes.length === 0) {
                            newState.ids = newState.ids.filter(
                                (id) => id !== "heatingType"
                            );
                        }
                    } else {
                        // Add value
                        newState.filters.heatingType = [...heatingTypes, value];

                        // Add to IDs if not already there
                        if (!newState.ids.includes("heatingType")) {
                            newState.ids = [...newState.ids, "heatingType"];
                        }
                    }

                    return newState;
                }),

            toggleLifestyleFilter: (key: keyof IPropertyFilterExtras) =>
                setState((prevState) => {
                    const newState = { ...prevState };

                    if (newState.filters.extras.hasOwnProperty(key)) {
                        newState.filters.extras = {
                            ...newState.filters.extras,
                            [key]: !newState.filters.extras[key],
                        };

                        // Add or remove from IDs based on if any extras are active
                        const anyExtrasActive = Object.values(
                            newState.filters.extras
                        ).some((v) => Boolean(v));

                        if (
                            anyExtrasActive &&
                            !newState.ids.includes("extras")
                        ) {
                            newState.ids = [...newState.ids, "extras"];
                        } else if (
                            !anyExtrasActive &&
                            newState.ids.includes("extras")
                        ) {
                            newState.ids = newState.ids.filter(
                                (id) => id !== "extras"
                            );
                        }
                    }

                    return newState;
                }),

            // Delete operations
            deleteSubCategory: (value: string) =>
                setState((prevState) => {
                    const newState = { ...prevState };
                    const categories = [...newState.filters.categories];

                    // Remove category
                    newState.filters.categories = categories.filter(
                        (category) => category !== value
                    );

                    // Update IDs if needed
                    if (categories.length === 1) {
                        newState.ids = newState.ids.filter(
                            (id) => id !== "categories"
                        );
                    }

                    return newState;
                }),

            deleteState: (value: string) =>
                setState((prevState) => {
                    const newState = { ...prevState };
                    const states = [...newState.filters.states];

                    // Remove state
                    newState.filters.states = states.filter(
                        (state) => state !== value
                    );

                    // Update IDs if needed
                    if (states.length === 1) {
                        newState.ids = newState.ids.filter(
                            (id) => id !== "states"
                        );
                    }

                    return newState;
                }),

            deleteLifestyle: (key: keyof IPropertyFilterExtras) =>
                setState((prevState) => {
                    const newState = { ...prevState };

                    if (newState.filters.extras.hasOwnProperty(key)) {
                        newState.filters.extras = {
                            ...newState.filters.extras,
                            [key]: false,
                        };

                        // Check if any extras are still active
                        const anyExtrasActive = Object.values(
                            newState.filters.extras
                        ).some((v) => Boolean(v));

                        if (!anyExtrasActive) {
                            newState.ids = newState.ids.filter(
                                (id) => id !== "extras"
                            );
                        }
                    }

                    return newState;
                }),
            deleteFilter: (key: keyof IPropertyFilter) =>
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
                    const newFilters = { ...newState.filters };

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
                setState((prevState) => {
                    const newState = { ...prevState };

                    // Reset frameType
                    newState.filters.frameType = initialState.filters.frameType;

                    // Remove from IDs
                    newState.ids = newState.ids.filter(
                        (id) => id !== "frameType"
                    );

                    return newState;
                }),
            resetFurnished: () =>
                setState((prevState) => {
                    const newState = { ...prevState };

                    // Reset furnished
                    newState.filters.furnished = initialState.filters.furnished;

                    // Remove from IDs
                    newState.ids = newState.ids.filter(
                        (id) => id !== "furnished"
                    );

                    return newState;
                }),
            resetHeatingType: () =>
                setState((prevState) => {
                    const newState = { ...prevState };

                    // Reset heatingType
                    newState.filters.heatingType =
                        initialState.filters.heatingType;

                    // Remove from IDs
                    newState.ids = newState.ids.filter(
                        (id) => id !== "heatingType"
                    );

                    return newState;
                }),
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
                    const newState = { ...prevState };

                    // Reset points
                    newState.filters.points = initialState.filters.points;

                    // Remove from IDs
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
                    const newState = { ...prevState };

                    // Reset extras
                    newState.filters.extras = initialState.filters.extras;

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
                    const newState = { ...prevState };

                    // Reset regions and cities
                    newState.filters.regions = initialState.filters.regions;
                    newState.filters.cities = initialState.filters.cities;

                    // Remove from IDs
                    newState.ids = newState.ids.filter(
                        (id) => id !== "regions" && id !== "cities"
                    );

                    return newState;
                }),

            // Other state setters
            setActiveState: (value: boolean | null) =>
                updateFilter("active", value),

            setSorting: (value: string) =>
                setState((prevState) => ({
                    ...prevState,
                    sorting: value,
                })),

            setIds: (value: (keyof IPropertyFilter)[]) =>
                setState((prevState) => ({
                    ...prevState,
                    ids: value,
                })),
        }),
        []
    );

export default useSetters;
