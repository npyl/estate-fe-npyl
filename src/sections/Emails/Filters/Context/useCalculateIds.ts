import { IEmailFilters } from "@/types/email";
import { useMemo } from "react";
import { INITIAL_STATE } from "./constants";

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

const useCalculateIds = (filters: IEmailFilters) =>
    useMemo(() => {
        const changed: Partial<IEmailFilters> = {};

        (Object.keys(filters) as (keyof IEmailFilters)[]).forEach((key) => {
            if (isDifferent(filters[key], INITIAL_STATE[key])) {
                changed[key] = filters[key] as any;
            }
        });

        return Object.keys(changed) as (keyof IEmailFilters)[];
    }, [filters]);

export default useCalculateIds;
