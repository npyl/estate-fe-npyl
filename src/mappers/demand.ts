import {
    IDemand,
    IDemandFilters,
    IDemandFiltersPOST,
    IDemandPOST,
} from "src/types/demand";

export const demandFiltersMapper = (
    demandFilters: IDemandFilters
): IDemandFiltersPOST => ({
    minBedrooms: demandFilters.minBedrooms,
    maxBedrooms: demandFilters.maxBedrooms,
    minBathrooms: demandFilters.minBathrooms,
    maxBathrooms: demandFilters.maxBathrooms,
    furnished: demandFilters.furnished.map((i) => i.key) || [],
    maxCovered: demandFilters.maxCovered,
    minCovered: demandFilters.minCovered,
    minPlot: demandFilters.minPlot,
    maxPlot: demandFilters.maxPlot,
    minYearOfConstruction: demandFilters.minYearOfConstruction,
    maxYearOfConstruction: demandFilters.maxYearOfConstruction,
    minFloor: demandFilters.minFloor.key,
    maxFloor: demandFilters.maxFloor.key,
    states: demandFilters.states.map((i) => i.key) || [],
    minPrice: demandFilters.minPrice,
    maxPrice: demandFilters.maxPrice,
    labels: demandFilters.labels || [],
    cities: demandFilters.cities || [],
    regions: demandFilters.regions || [],
    complexes: demandFilters.complexes || [],
    categories: demandFilters.categories.map((i) => i.key) || [],
    parentCategories: demandFilters.parentCategories.map((i) => i.key) || [],
});

export const demandMapper = (demand: IDemand): IDemandPOST => ({
    filters: demandFiltersMapper(demand.filters),
    priorityFeatures: demand.priorityFeatures,
    timeframe: demand.timeframe.key,
    shapes: demand.shapes,
});
