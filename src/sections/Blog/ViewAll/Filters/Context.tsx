import {
    useChangedFields as _useChangedFields,
    useCalculateIds,
} from "@/ui/Filters/useCalculateIds";
import { BlogFilters } from "@/types/company";
import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useContext,
    useState,
} from "react";

type State = {
    filters: BlogFilters;
    setSearch: (s: string) => void;
    setSites: (s: number[]) => void;
    setPublished: (p: boolean | undefined) => void;
    setUsers: (u: number[]) => void;
    setCategories: (c: number[]) => void;

    deleteFilter: (key: keyof BlogFilters) => void;
};

const FiltersContext = createContext<State | undefined>(undefined);

export const useFiltersContext = () => {
    const context = useContext(FiltersContext);
    if (context === undefined) {
        throw new Error(
            "FiltersContext value is undefined. Make sure you use the FiltersContext before using the context."
        );
    }
    return context;
};

const INITIAL_STATE: BlogFilters = {
    search: "",
    sites: [],
    users: [],
    categories: [],
    published: undefined,
};

interface ProviderProps extends PropsWithChildren {}

const FiltersProvider: FC<ProviderProps> = ({ children }) => {
    const [filters, setFilters] = useState<BlogFilters>(INITIAL_STATE);
    const setSearch = useCallback(
        (search: string) => setFilters((old) => ({ ...old, search })),
        []
    );
    const setSites = useCallback(
        (sites: number[]) => setFilters((old) => ({ ...old, sites })),
        []
    );
    const setPublished = useCallback(
        (published?: boolean) => setFilters((old) => ({ ...old, published })),
        []
    );
    const setUsers = useCallback(
        (users: number[]) => setFilters((old) => ({ ...old, users })),
        []
    );
    const setCategories = useCallback(
        (categories: number[]) => setFilters((old) => ({ ...old, categories })),
        []
    );
    const deleteFilter = useCallback(
        (key: keyof BlogFilters) =>
            setFilters((old) => ({ ...old, [key]: INITIAL_STATE[key] })),
        []
    );

    return (
        <FiltersContext.Provider
            value={{
                filters,
                setSearch,
                setSites,
                setPublished,
                setUsers,
                setCategories,
                deleteFilter,
            }}
        >
            {children}
        </FiltersContext.Provider>
    );
};

const useIds = () => {
    const { filters } = useFiltersContext();
    const ids = useCalculateIds<BlogFilters>(INITIAL_STATE as any, filters);
    return ids;
};

const useChangedFields = () => {
    const { filters } = useFiltersContext();
    return _useChangedFields<BlogFilters>(INITIAL_STATE, filters);
};

export { useChangedFields, useIds };
export default FiltersProvider;
