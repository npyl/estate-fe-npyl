import { parseAsInteger, useQueryState } from "nuqs";
import {
    createContext,
    useCallback,
    useContext,
    useLayoutEffect,
    useState,
} from "react";
import { ICustomerFilter } from "src/types/customer";

type TSetters = {
    setStatus: (status?: number) => void;
    setLeaser: (leaser: boolean) => void;
    setLessor: (lessor: boolean) => void;
    setSeller: (seller: boolean) => void;
    setBuyer: (buyer: boolean) => void;
    setManagerId: (managerId?: number) => void;
    setLabels: (labels: any[]) => void;
    setCategories: (categories: any[]) => void;
    setParentCategories: (parentCategories: any[]) => void;
    setMaxPrice: (maxPrice: any) => void;
    setMinPrice: (minPrice: any) => void;
    setMinArea: (minArea: any) => void;
    setMaxArea: (maxArea: any) => void;
    setStates: (states: any[]) => void;
    setSorting: (sorting: string) => void;
    deleteFilter: (key: keyof ICustomerFilter) => void;
    resetState: () => void;
};

type Filters = {
    filters: ICustomerFilter;
    sorting: string;
    ids: string[];
};

type FiltersState = Filters & TSetters;

const initialState: Filters = {
    filters: {
        labels: [],
        categories: [],
        parentCategories: [],
        leaser: false,
        lessor: false,
        buyer: false,
        seller: false,
        b2b: false,
        status: undefined,
        managerId: undefined,
        maxPrice: undefined,
        minPrice: undefined,
        minCovered: undefined,
        maxCovered: undefined,
        states: [],
    },
    sorting: "default",
    ids: [],
};

const useSetters = (
    setFilters: React.Dispatch<React.SetStateAction<ICustomerFilter>>,
    setSorting: React.Dispatch<React.SetStateAction<string>>
) => {
    const setStatus = useCallback(
        (status?: number) => setFilters((old) => ({ ...old, status })),
        []
    );

    const setLeaser = useCallback(
        (leaser: boolean) => setFilters((old) => ({ ...old, leaser })),
        []
    );

    const setLessor = useCallback(
        (lessor: boolean) => setFilters((old) => ({ ...old, lessor })),
        []
    );

    const setSeller = useCallback(
        (seller: boolean) => setFilters((old) => ({ ...old, seller })),
        []
    );

    const setBuyer = useCallback(
        (buyer: boolean) => setFilters((old) => ({ ...old, buyer })),
        []
    );

    const setManagerId = useCallback(
        (managerId?: number) => setFilters((old) => ({ ...old, managerId })),
        []
    );

    const setLabels = useCallback(
        (labels: any[]) => setFilters((old) => ({ ...old, labels })),
        []
    );

    const setCategories = useCallback(
        (categories: any[]) => setFilters((old) => ({ ...old, categories })),
        []
    );

    const setParentCategories = useCallback(
        (parentCategories: any[]) =>
            setFilters((old) => ({ ...old, parentCategories })),
        []
    );

    const setMaxPrice = useCallback(
        (maxPrice: any) => setFilters((old) => ({ ...old, maxPrice })),
        []
    );

    const setMinPrice = useCallback(
        (minPrice: any) => setFilters((old) => ({ ...old, minPrice })),
        []
    );

    const setMinArea = useCallback(
        (minCovered: any) => setFilters((old) => ({ ...old, minCovered })),
        []
    );

    const setMaxArea = useCallback(
        (maxCovered: any) => setFilters((old) => ({ ...old, maxCovered })),
        []
    );

    const setStates = useCallback(
        (states: any[]) => setFilters((old) => ({ ...old, states })),
        []
    );

    const resetState = useCallback(() => {
        setFilters(initialState.filters);
        setSorting(initialState.sorting);
    }, [setFilters, setSorting]);

    return {
        setStatus,
        setLeaser,
        setLessor,
        setSeller,
        setBuyer,
        setManagerId,
        setLabels,
        setCategories,
        setParentCategories,
        setMaxPrice,
        setMinPrice,
        setMinArea,
        setMaxArea,
        setStates,
        setSorting,
        resetState,
    };
};

const CustomerFiltersContext = createContext<FiltersState>({
    filters: initialState.filters,
    sorting: initialState.sorting,
    ids: initialState.ids,

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

export const CustomerFiltersProvider: React.FC<
    React.PropsWithChildren<unknown>
> = (props) => {
    const [filters, setFilters] = useState(initialState.filters);
    const [sorting, setSorting] = useState(initialState.sorting);
    const [ids] = useState([]);

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
                ids,
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
export const useIds = () => useFiltersContext().ids;

export const useSumOfChangedProperties = () => 0;
export const useChangedFields = () => [];
