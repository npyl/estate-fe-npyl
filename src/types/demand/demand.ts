import { Nullable } from "@/types/common";
import { IPropertyFeatures } from "@/types/features";
import { KeyValue } from "@/types/KeyValue";
import { TShape } from "@/types/shape";

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
    minBedrooms: Nullable<number>;
    maxBedrooms: Nullable<number>;
    minBathrooms: Nullable<number>;
    maxBathrooms: Nullable<number>;
    maxCovered: Nullable<number>;
    minCovered: Nullable<number>;
    minPlot: Nullable<number>;
    maxPlot: Nullable<number>;
    minYearOfConstruction: Nullable<number>;
    maxYearOfConstruction: Nullable<number>;
    minFloor: Nullable<string>;
    maxFloor: Nullable<string>;
    minPrice: Nullable<number>;
    maxPrice: Nullable<number>;

    furnished: string[];
    states: string[];
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
