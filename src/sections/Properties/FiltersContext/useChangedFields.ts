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
 * Custom hook that calculates which filter properties have changed from their initial state
 */
const useChangedFields = (filters: IPropertyFilter) => {
    return useMemo(() => {
        return Object.entries(filters).reduce(
            (acc: Partial<IPropertyFilter>, [_key, value]) => {
                const key = _key as keyof IPropertyFilter;
                const initialValue = initialState.filters[key];

                // Skip if undefined or null values match
                if (value === initialValue) return acc;

                // Special handling for arrays
                if (Array.isArray(value) && Array.isArray(initialValue)) {
                    // Only consider it changed if the arrays are different
                    if (!areArraysEqual(value, initialValue)) {
                        acc[key] = value;
                    }
                    return acc;
                }

                // Special handling for extras object with booleans
                if (
                    key === "extras" &&
                    typeof value === "object" &&
                    value !== null
                ) {
                    const initialExtras = initialState.filters
                        .extras as IPropertyFilterExtras;

                    if (!areObjectsEqual(value as object, initialExtras)) {
                        // Only include if at least one property is different
                        acc[key] = value;
                    }
                    return acc;
                }

                // For primitive values, only include if they're different
                if (value !== initialValue) {
                    acc[key] = value;
                }

                return acc;
            },
            {}
        );
    }, [filters]);
};

export default useChangedFields;
