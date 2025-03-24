import { Dispatch, SetStateAction, useMemo } from "react";
import { IFilterProps, IFilterStateSetters, TUpdateFilterCb } from "./types";
import { initialState } from "./constant";

type UseSetters = (
    updateFilter: TUpdateFilterCb,
    setState: Dispatch<SetStateAction<IFilterProps>>
) => IFilterStateSetters;

const useSetters: UseSetters = (updateFilter, setState) =>
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

            toggleFrameType: (value) =>
                setState((prevState) => {
                    // Make a safe copy of the frameType array
                    const frameTypes = Array.isArray(
                        prevState.filters.frameType
                    )
                        ? [...prevState.filters.frameType]
                        : [];

                    // Determine new frameType array based on inclusion of value
                    let newFrameType;
                    if (frameTypes.includes(value)) {
                        // Remove value
                        newFrameType = frameTypes.filter((ft) => ft !== value);
                    } else {
                        // Add value
                        newFrameType = [...frameTypes, value];
                    }

                    // Create a completely new filters object
                    const newFilters = {
                        ...prevState.filters,
                        frameType: newFrameType,
                    };

                    // Determine new IDs array
                    let newIds;
                    if (
                        newFrameType.length === 0 &&
                        prevState.ids.includes("frameType")
                    ) {
                        // Remove frameType from IDs if empty
                        newIds = prevState.ids.filter(
                            (id) => id !== "frameType"
                        );
                    } else if (
                        newFrameType.length > 0 &&
                        !prevState.ids.includes("frameType")
                    ) {
                        // Add frameType to IDs if not empty and not already included
                        newIds = [...prevState.ids, "frameType"];
                    } else {
                        // Keep IDs the same, but create a new array
                        newIds = [...prevState.ids];
                    }

                    // Return a completely new state object
                    return {
                        ...prevState,
                        filters: newFilters,
                        ids: newIds,
                    };
                }),

            toggleFurnished: (value) =>
                setState((prevState) => {
                    // Safely copy the furnished array
                    const furnished = Array.isArray(prevState.filters.furnished)
                        ? [...prevState.filters.furnished]
                        : [];

                    // Determine new furnished array based on inclusion of value
                    let newFurnished;
                    if (furnished.includes(value)) {
                        // Remove value
                        newFurnished = furnished.filter((f) => f !== value);
                    } else {
                        // Add value
                        newFurnished = [...furnished, value];
                    }

                    // Create a completely new filters object
                    const newFilters = {
                        ...prevState.filters,
                        furnished: newFurnished,
                    };

                    // Determine new IDs array
                    let newIds;
                    if (
                        newFurnished.length === 0 &&
                        prevState.ids.includes("furnished")
                    ) {
                        // Remove furnished from IDs if empty
                        newIds = prevState.ids.filter(
                            (id) => id !== "furnished"
                        );
                    } else if (
                        newFurnished.length > 0 &&
                        !prevState.ids.includes("furnished")
                    ) {
                        // Add furnished to IDs if not empty and not already included
                        newIds = [...prevState.ids, "furnished"];
                    } else {
                        // Keep IDs the same but create a new array
                        newIds = [...prevState.ids];
                    }

                    // Return a completely new state object
                    return {
                        ...prevState,
                        filters: newFilters,
                        ids: newIds,
                    };
                }),

            toggleHeatingType: (value) =>
                setState((prevState) => {
                    // Safely copy the heatingType array
                    const heatingTypes = Array.isArray(
                        prevState.filters.heatingType
                    )
                        ? [...prevState.filters.heatingType]
                        : [];

                    // Determine new heatingType array based on inclusion of value
                    let newHeatingType;
                    if (heatingTypes.includes(value)) {
                        // Remove value
                        newHeatingType = heatingTypes.filter(
                            (ht) => ht !== value
                        );
                    } else {
                        // Add value
                        newHeatingType = [...heatingTypes, value];
                    }

                    // Create a completely new filters object
                    const newFilters = {
                        ...prevState.filters,
                        heatingType: newHeatingType,
                    };

                    // Determine new IDs array
                    let newIds;
                    if (
                        newHeatingType.length === 0 &&
                        prevState.ids.includes("heatingType")
                    ) {
                        // Remove heatingType from IDs if empty
                        newIds = prevState.ids.filter(
                            (id) => id !== "heatingType"
                        );
                    } else if (
                        newHeatingType.length > 0 &&
                        !prevState.ids.includes("heatingType")
                    ) {
                        // Add heatingType to IDs if not empty and not already included
                        newIds = [...prevState.ids, "heatingType"];
                    } else {
                        // Keep IDs the same but create a new array
                        newIds = [...prevState.ids];
                    }

                    // Return a completely new state object
                    return {
                        ...prevState,
                        filters: newFilters,
                        ids: newIds,
                    };
                }),

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

            // Delete operations
            deleteSubCategory: (value) =>
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

            deleteState: (value) =>
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

            deleteLifestyle: (key) =>
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
