import {
    useCalculateIds,
    useChangedFields as _useChangedFields,
} from "@/ui/Filters/useCalculateIds";
import { parseAsInteger, useQueryState } from "nuqs";
import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useContext,
    useLayoutEffect,
    useState,
} from "react";
import { ICustomerFilter } from "src/types/customer";
import useSetters from "./useSetters";
import { initialState } from "./constants";
import { FiltersState } from "./types";
import useFilterState from "./useFilterState";

const CustomerFiltersContext = createContext<FiltersState>({
    filters: initialState.filters,
    sorting: initialState.sorting,

    setStatus: () => {},
    setLeaser: () => {},
    setLessor: () => {},
    setSeller: () => {},
    setBuyer: () => {},
    setManagerId: () => {},
    setLabels: () => {},
    setCategories: () => {},
    setParentCategories: () => {},
    setMaxPrice: () => {},
    setMinPrice: () => {},
    setMinArea: () => {},
    setMaxArea: () => {},
    setStates: () => {},
    setSorting: () => {},
    setB2B: () => {},
    deleteFilter: () => {},
    resetState: () => {},
});

export const useFiltersContext = () => {
    const context = useContext(CustomerFiltersContext);
    if (context === undefined) {
        throw new Error(
            "CustomerFiltersContext value is undefined. Make sure you use the CustomerFiltersProvider before using the context."
        );
    }
    return context;
};

interface Props extends PropsWithChildren {
    b2b?: boolean;
}

export const FiltersProvider: FC<Props> = ({ b2b = false, ...props }) => {
    const [filters, setFilters] = useFilterState(b2b);
    const [sorting, setSorting] = useState(initialState.sorting);

    const deleteFilter = useCallback(
        (key: keyof ICustomerFilter) => {
            const initialValue = initialState.filters[key];
            setFilters((old) => ({ ...old, [key]: initialValue }));
        },
        [filters]
    );

    // Use the custom hook for all setters
    const setters = useSetters(setFilters, setSorting);

    const [managerId] = useQueryState("managerId", parseAsInteger);
    useLayoutEffect(() => {
        if (managerId === null) return;
        setters.setManagerId(managerId);
    }, [managerId]);

    return (
        <CustomerFiltersContext.Provider
            value={{
                filters,
                sorting,
                ...setters,
                deleteFilter,
            }}
            {...props}
        />
    );
};

export const useSelectAll = () => useFiltersContext().filters;
export const useStatus = () => useFiltersContext().filters.status;
export const useLeaser = () => useFiltersContext().filters.leaser;
export const useLessor = () => useFiltersContext().filters.lessor;
export const useSeller = () => useFiltersContext().filters.seller;
export const useBuyer = () => useFiltersContext().filters.buyer;
export const useB2b = () => useFiltersContext().filters.b2b;
export const useManagerId = () => useFiltersContext().filters.managerId;
export const useLabels = () => useFiltersContext().filters.labels;
export const useCategories = () => useFiltersContext().filters.categories;
export const useParentCategories = () =>
    useFiltersContext().filters.parentCategories;
export const useMaxPrice = () => useFiltersContext().filters.maxPrice;
export const useMinPrice = () => useFiltersContext().filters.minPrice;
export const useMinArea = () => useFiltersContext().filters.minCovered;
export const useMaxArea = () => useFiltersContext().filters.maxCovered;
export const useStates = () => useFiltersContext().filters.states;
export const useSorting = () => useFiltersContext().sorting;

export const useSumOfChangedProperties = () => {
    const { filters } = useFiltersContext();
    return useCalculateIds(initialState.filters, filters).length;
};

export const useIds = () => {
    const { filters } = useFiltersContext();
    return useCalculateIds<ICustomerFilter>(initialState.filters, filters);
};

export const useChangedFields = () => {
    const { filters } = useFiltersContext();
    return _useChangedFields<ICustomerFilter>(initialState.filters, filters);
};
