import { useMemo } from "react";
import { IPropertyFilter, IPropertyFilterExtras } from "src/types/properties";
import { initialState } from "./constant";

/**
 * Utility to check if two arrays are equal by comparing their values
 */
const areArraysEqual = (arr1: any[], arr2: any[]): boolean => {
    if (arr1.length !== arr2.length) return false;

    // For simple value arrays
    if (arr1.every((item) => typeof item !== "object")) {
        return (
            arr1.every((item) => arr2.includes(item)) &&
            arr2.every((item) => arr1.includes(item))
        );
    }

    // For more complex objects in arrays (would need deeper comparison)
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
};

/**
 * Utility to check if two objects are equal by comparing their properties
 */
const areObjectsEqual = (
    obj1: Record<string, any>,
    obj2: Record<string, any>
): boolean => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => {
        const val1 = obj1[key];
        const val2 = obj2[key];

        // Handle nested objects
        if (
            typeof val1 === "object" &&
            val1 !== null &&
            typeof val2 === "object" &&
            val2 !== null
        ) {
            return Array.isArray(val1) && Array.isArray(val2)
                ? areArraysEqual(val1, val2)
                : areObjectsEqual(val1, val2);
        }

        return val1 === val2;
    });
};

/**
 * Utility to check if a filter value is different from its initial state
 * @param entry - A key-value pair from the filters object
 * @returns boolean indicating if the value has changed from initial state
 */
const isDifferent = (entry: [string, any]): boolean => {
    const [key, value] = entry;
    const initialValue = initialState.filters[key as keyof IPropertyFilter];

    // If values are strictly equal, they're not different
    if (value === initialValue) return false;

    // Handle arrays comparison
    if (Array.isArray(value) && Array.isArray(initialValue)) {
        return !areArraysEqual(value, initialValue);
    }

    // Handle extras object (which contains booleans)
    if (key === "extras" && typeof value === "object" && value !== null) {
        const initialExtras = initialState.filters
            .extras as IPropertyFilterExtras;
        return !areObjectsEqual(value as object, initialExtras);
    }

    // For primitive values or other cases
    return value !== initialValue;
};

/**
 * Checks if any filters have changed from their initial state
 */
const didChangeFields = (filters: IPropertyFilter): boolean => {
    const entries = Object.entries(filters);
    return entries.some(isDifferent);
};

const getChangedFields = (filters: IPropertyFilter) =>
    Object.entries(filters).reduce((acc: Partial<IPropertyFilter>, entry) => {
        const [_key, value] = entry;
        const key = _key as keyof IPropertyFilter;

        // Only include this field in the result if it's different from initial state
        if (isDifferent(entry)) {
            acc[key] = value;
        }

        return acc;
    }, {});

/**
 * Custom hook that calculates which filter properties have changed from their initial state
 */
const useChangedFields = (filters: IPropertyFilter) =>
    useMemo(() => getChangedFields(filters), [filters]);

export { didChangeFields, getChangedFields };
export default useChangedFields;
