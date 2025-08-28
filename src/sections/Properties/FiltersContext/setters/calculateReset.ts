import { IFilterProps } from "@/sections/Properties/FiltersContext/types";
import { initialState } from "@/sections/Properties/FiltersContext/constant";

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

const calculateReset = (prevState: IFilterProps) => {
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
};

export default calculateReset;
