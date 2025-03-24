import { IPropertyFilter, IPropertyFilterExtras } from "@/types/properties";

type TUpdateFilterCb = (
    key: keyof IPropertyFilter,
    value: any,
    shouldAddToIds?: boolean
) => void;

interface IFilterProps {
    filters: IPropertyFilter;
    sorting: string;
    ids: (keyof IPropertyFilter)[];
}

type IFilterState = IFilterProps & {
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
    setMaxFloor: (value: number | undefined) => void;
    setMinFloor: (value: number | undefined) => void;

    // Price
    setMaxPrice: (value: number | undefined) => void;
    setMinPrice: (value: number | undefined) => void;

    // Multiple selection
    setRegions: (value: string[]) => void;
    setCities: (value: string[]) => void;
    setLabels: (value: string[]) => void;
    setStates: (value: string[]) => void;
    setSubCategories: (value: string[]) => void;
    setParentCategories: (value: string[]) => void;
    setPoints: (value: any[]) => void;

    // Togglers
    toggleFrameType: (value: string) => void;
    toggleFurnished: (value: string) => void;
    toggleHeatingType: (value: string) => void;
    toggleLifestyleFilter: (key: keyof IPropertyFilterExtras) => void;

    // Delete operations
    deleteSubCategory: (value: string) => void;
    deleteState: (value: string) => void;
    deleteLifestyle: (key: keyof IPropertyFilterExtras) => void;
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

    // Active state
    setActiveState: (value: boolean | null) => void;

    // Sorting
    setSorting: (value: string) => void;

    // Derived values
    sumOfChangedProperties: number;
    changedFields: Partial<IPropertyFilter>;
};

export type { TUpdateFilterCb, IFilterProps, IFilterState };
