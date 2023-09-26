import { KeyValue } from "./KeyValue";
import { IPropertyFeatures } from "./features";

export interface IDemandFilters {
    minBedrooms: number;
    maxBedrooms: number;
    minBathrooms: number;
    maxBathrooms: number;
    furnished: string[];
    maxCovered: number;
    minCovered: number;
    minPlot: number;
    maxPlot: number;
    minYearOfConstruction: number;
    maxYearOfConstruction: number;
    minFloor: string;
    maxFloor: string;
    states: string[];
    minPrice: number;
    maxPrice: number;
    labels: number[];
    cities: string[];
    regions: string[];
    complexes: string[];
    categories: string[];
    parentCategories: string[];
}

export interface IDemand {
    filters: IDemandFilters;
    priorityFeatures: IPropertyFeatures;
    nonPriorityFeatures: IPropertyFeatures;
    timeframe: KeyValue;
    shape: string; // map shape
}

export interface IDemandPOST {
    filters: Partial<IDemandFilters>;
    priorityFeatures: IPropertyFeatures;
    nonPriorityFeatures: IPropertyFeatures;
    timeframe: string;
    shape: string; // map shape
}
