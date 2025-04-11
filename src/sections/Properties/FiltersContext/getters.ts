import { useFiltersContext } from ".";

const useLocationSearch = () => useFiltersContext().filters.locationSearch;
const useCode = () => useFiltersContext().filters.code;
const useFrameType = () => useFiltersContext().filters.frameType;
const useFurnished = () => useFiltersContext().filters.furnished;
const useHeatingType = () => useFiltersContext().filters.heatingType;
const useManagerId = () => useFiltersContext().filters.managerId;
const useMaxArea = () => useFiltersContext().filters.maxArea;
const useMaxBedrooms = () => useFiltersContext().filters.maxBedrooms;
const useMaxConstructionYear = () =>
    useFiltersContext().filters.maxConstructionYear;
const useMaxFloor = () => useFiltersContext().filters.maxFloor;
const useMaxPrice = () => useFiltersContext().filters.maxPrice;
const useMinArea = () => useFiltersContext().filters.minArea;
const useMinBedrooms = () => useFiltersContext().filters.minBedrooms;
const useMinConstructionYear = () =>
    useFiltersContext().filters.minConstructionYear;
const useMinFloor = () => useFiltersContext().filters.minFloor;
const useMinPrice = () => useFiltersContext().filters.minPrice;
const useRegions = () => useFiltersContext().filters.regions;
const useCities = () => useFiltersContext().filters.cities;
const useStates = () => useFiltersContext().filters.states;
const useParentCategories = () => useFiltersContext().filters.parentCategories;
const useSubCategories = () => useFiltersContext().filters.categories;
const useLabels = () => useFiltersContext().filters.labels;
const useIds = () => useFiltersContext().ids;
const usePoints = () => useFiltersContext().filters.points;
const useExtras = () => useFiltersContext().filters.extras;
const useSorting = () => useFiltersContext().sorting;
const useAllFilters = () => useFiltersContext().filters;
const useActiveState = () => useFiltersContext().filters.active;
const useIntegrationSites = () => useFiltersContext().filters.integrationSites;

const useSumOfChangedProperties = () =>
    useFiltersContext().sumOfChangedProperties;
const useChangedFields = () => useFiltersContext().changedFields;

export {
    useLocationSearch,
    useCode,
    useFrameType,
    useFurnished,
    useHeatingType,
    useManagerId,
    useMaxArea,
    useMaxBedrooms,
    useMaxConstructionYear,
    useMaxFloor,
    useMaxPrice,
    useMinArea,
    useMinBedrooms,
    useMinConstructionYear,
    useMinFloor,
    useMinPrice,
    useRegions,
    useCities,
    useStates,
    useParentCategories,
    useSubCategories,
    useLabels,
    useIds,
    usePoints,
    useExtras,
    useSorting,
    useAllFilters,
    useActiveState,
    useIntegrationSites,
    // ...
    useSumOfChangedProperties,
    useChangedFields,
};
