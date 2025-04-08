import { IntegrationSite } from "@/types/listings";
import { IPropertyFilter, IPropertyFilterExtras } from "@/types/properties";

type TUpdateFilterCb = (
    key: keyof IPropertyFilter,
    value: any,
    shouldAddToIds?: boolean
) => void;

interface IFilterProps {
    filters: IPropertyFilter;
    ids: (keyof IPropertyFilter)[];
}

interface IFilterStateSetters {
    // Location
    setLocationSearch: (value: string | undefined) => void;
    setCode: (value: string | undefined) => void;

    // IDs and Manager
    setManagerId: (value: number | undefined) => void;
    setIds: (value: (keyof IPropertyFilter)[]) => void;

    // Area
    setMaxArea: (value: number | undefined) => void;
    setMinArea: (value: number | undefined) => void;

    // Bedrooms
    setMaxBedrooms: (value: number | undefined) => void;
    setMinBedrooms: (value: number | undefined) => void;

    // Construction
    setMaxConstructionYear: (value: number | undefined) => void;
    setMinConstructionYear: (value: number | undefined) => void;

    // Floor
    setMaxFloor: (value: string | undefined) => void;
    setMinFloor: (value: string | undefined) => void;

    // Price
    setMaxPrice: (value: number | undefined) => void;
    setMinPrice: (value: number | undefined) => void;

    // Multiple selection
    setRegions: (value: string[]) => void;
    setCities: (value: string[]) => void;
    setLabels: (value: number[]) => void;
    setStates: (value: string[]) => void;
    setSubCategories: (value: string[]) => void;
    setParentCategories: (value: string[]) => void;
    setPoints: (value: any[]) => void;
    setIntegrationSites: (v: IntegrationSite[]) => void;

    // Togglers
    toggleFrameType: (value: string) => void;
    toggleFurnished: (value: string) => void;
    toggleHeatingType: (value: string) => void;
    toggleLifestyleFilter: (key: keyof IPropertyFilterExtras) => void;

    // Delete operations
    deleteFilter: (key: keyof IPropertyFilter) => void;

    // Reset operations
    resetLocationSearch: () => void;
    resetBasic: () => void;
    resetBedrooms: () => void;
    resetFloor: () => void;
    resetFrameType: () => void;
    resetFurnished: () => void;
    resetHeatingType: () => void;
    resetConstructionYear: () => void;
    resetPoints: () => void;
    resetState: () => void;
    resetActiveState: () => void;
    resetExtras: () => void;
    resetStates: () => void;
    resetCategories: () => void;
    resetParentCategories: () => void;
    resetRegions: () => void;
    resetManagerId: () => void;
    resetIntegrationSites: VoidFunction;

    // Active state
    setActiveState: (value: boolean | null) => void;
}

interface IFilterStateCalculated {
    sumOfChangedProperties: number;
    changedFields: Partial<IPropertyFilter>;
}

type IFilterState = IFilterProps &
    IFilterStateSetters &
    IFilterStateCalculated & {
        // Sorting
        sorting: string;
        setSorting: (value: string) => void;
    };

export type {
    TUpdateFilterCb,
    IFilterProps,
    IFilterStateSetters,
    IFilterState,
};
