import { ILabel } from "./label";
import { IPropertyFeatures } from "./features";

export interface IDemandFilters {
  minBedrooms: number;
  maxBedrooms: number;
  minBathrooms: number;
  maxBathrooms: number;
  furnished: string;
  maxCovered: number;
  minCovered: number;
  minPlot: number;
  maxPlot: number;
  minYearOfConstruction: number;
  maxYearOfConstruction: number;
  minFloor: string;
  maxFloor: string;
  parentCategory: string;
  category: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  labels: ILabel[];
}

export interface IDemandFiltersPOST {
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  furnished?: string;
  maxCovered?: number;
  minCovered?: number;
  minPlot?: number;
  maxPlot?: number;
  minYearOfConstruction?: number;
  maxYearOfConstruction?: number;
  minFloor?: string;
  maxFloor?: string;
  parentCategory?: string;
  category?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  labelIDs?: number[];
}

export interface IDemand {
  filters: IDemandFilters;
  priorityFeatures: IPropertyFeatures;
  nonPriorityFeatures: IPropertyFeatures;
  timeframe: string;
}

export interface IDemandPOST {
  filters: IDemandFiltersPOST;
  priorityFeatures: IPropertyFeatures;
  nonPriorityFeatures: IPropertyFeatures;
  timeframe: string;
}
