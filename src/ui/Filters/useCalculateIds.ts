import { useMemo } from "react";

// Utility to check if two arrays are equal
const areArraysEqual = (arr1: any[], arr2: any[]): boolean => {
    if (arr1.length !== arr2.length) return false;

    // For simple value arrays (like number[] for propertyIds)
    return (
        arr1.every((item) => arr2.includes(item)) &&
        arr2.every((item) => arr1.includes(item))
    );
};

// Utility to check if a value is different from its initial state
const isDifferent = (value: any, initialValue: any): boolean => {
    if (value === initialValue) return false;

    // Handle arrays comparison (for propertyIds)
    if (Array.isArray(value) && Array.isArray(initialValue)) {
        return !areArraysEqual(value, initialValue);
    }

    return value !== initialValue;
};

const getChangedFields = <T extends object>(filters: T, initialState: T) =>
    Object.entries(filters).reduce((acc: Partial<T>, entry) => {
        const [_key, value] = entry;
        const key = _key as keyof T;

        // Only include this field in the result if it's different from initial state
        if (isDifferent(value, initialState[key])) {
            acc[key] = value;
        }

        return acc;
    }, {});

// -------------------------------------------------------------------------------------

const useChangedFields = <T extends object>(filters: T, INITIAL_STATE: T) =>
    useMemo(() => getChangedFields(filters, INITIAL_STATE), [filters]);

const useCalculateIds = <T extends object>(INITIAL_STATE: T, filters: T) =>
    useMemo(() => {
        const changed: Partial<T> = {};

        const keys = Object.keys(filters) as (keyof T)[];

        keys.forEach((key) => {
            if (isDifferent(filters[key], INITIAL_STATE[key])) {
                changed[key] = filters[key] as any;
            }
        });

        return Object.keys(changed) as (keyof T)[];
    }, [filters]);

export { useCalculateIds, useChangedFields };
