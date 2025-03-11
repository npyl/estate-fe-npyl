import { IPropertyFeatures } from "./features";
import { KeyValue } from "./KeyValue";
import { TShape } from "./shape";

export interface IDemandFilters {
    minBedrooms: number;
    maxBedrooms: number;
    minBathrooms: number;
    maxBathrooms: number;
    furnished: KeyValue[];
    maxCovered: number;
    minCovered: number;
    minPlot: number;
    maxPlot: number;
    minYearOfConstruction: number;
    maxYearOfConstruction: number;
    minFloor: KeyValue;
    maxFloor: KeyValue;
    states: KeyValue[];
    minPrice: number;
    maxPrice: number;
    labels: number[];
    cities: string[];
    regions: string[];
    complexes: string[];
    categories: KeyValue[];
    parentCategories: KeyValue[];
}

export interface IDemandFiltersPOST {
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
    minFloor: string | null;
    maxFloor: string | null;
    states: string[];
    minPrice: number;
    maxPrice: number;
    labels: number[];
    cities: string[];
    regions: string[];
    complexes: string[];
    categories: string[];
    parentCategories: string[];

    [key: string]: any;
}

export interface IPriorityFeatures extends IPropertyFeatures {
    alarmSystem: boolean;
}

export interface IDemand {
    filters: IDemandFilters;
    priorityFeatures: IPriorityFeatures;
    timeframe: KeyValue;
    shapeList: TShape[];
}

export interface IDemandPOST {
    filters: Partial<IDemandFiltersPOST>;
    priorityFeatures: IPriorityFeatures;
    timeframe: string | null;
    shapeList: TShape[];
}

export type ParentCategory = "RESIDENTIAL" | "COMMERCIAL" | "LAND" | "OTHER";
