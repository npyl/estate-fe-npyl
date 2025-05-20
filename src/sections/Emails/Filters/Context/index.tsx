import { IEmailFilters } from "@/types/email";
import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useMemo,
    useState,
} from "react";
import { INITIAL_STATE } from "./constants";
import useCalculateIds from "./useCalculateIds";
import useDeleteFilter from "./useDeleteFilter";
import { Setters } from "./types";

type State = Setters & {
    filters: IEmailFilters;
    ids: (keyof IEmailFilters)[];

    to: string[];
    toFreeSoloed: string[];

    isPropertyPage: boolean;
    isCustomerPage: boolean;
    currentPropertyId?: number;
    currentCustomerEmail?: string;

    deleteFilter: (filterKey: keyof IEmailFilters) => void;
};

const FiltersContext = createContext<State>({
    filters: INITIAL_STATE,
    ids: [],

    to: [],
    toFreeSoloed: [],
    setToFreeSoloed: () => {},

    isCustomerPage: false,
    isPropertyPage: false,

    setSearch: () => {},
    setFrom: () => {},
    setPropertyIds: () => {},
    setTo: () => {},

    deleteFilter: () => {},
});

export const useFiltersContext = () => {
    const context = useContext(FiltersContext);
    if (context === undefined) {
        throw new Error(
            "FiltersContext value is undefined. Make sure you use the FiltersContext before using the context."
        );
    }
    return context;
};

interface ProviderProps extends PropsWithChildren {
    to?: string;
    propertyId?: number;
}

const FiltersProvider: FC<ProviderProps> = ({
    to: _to = "",
    propertyId,
    children,
}) => {
    const _propertyIds = Boolean(propertyId) ? [propertyId!] : [];

    const [search, setSearch] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState(_to ? [_to] : []);
    const [propertyIds, setPropertyIds] = useState<number[]>(_propertyIds);

    const [toFreeSoloed, setToFreeSoloed] = useState<string[]>([]);

    const filters: IEmailFilters = {
        search,
        from,
        to: [...to, ...toFreeSoloed],
        propertyIds,
    };

    const ids = useCalculateIds(filters);

    const isPropertyPage = Boolean(propertyId);
    const isCustomerPage = Boolean(_to);

    const setters: Setters = useMemo(
        () => ({
            setFrom,
            setPropertyIds,
            setSearch,
            setTo,
            setToFreeSoloed,
        }),
        [setFrom, setPropertyIds, setSearch, setTo, setToFreeSoloed]
    );
    const deleteFilter = useDeleteFilter(
        setters,
        isPropertyPage,
        isCustomerPage,
        { propertyId, _to }
    );

    return (
        <FiltersContext.Provider
            value={{
                filters,
                ids,
                // ...
                to,
                toFreeSoloed,
                // ...
                isPropertyPage,
                isCustomerPage,
                currentPropertyId: propertyId,
                currentCustomerEmail: _to,
                // ...
                ...setters,
                // ...
                deleteFilter,
            }}
        >
            {children}
        </FiltersContext.Provider>
    );
};

const useIds = () => useFiltersContext().ids;

export { useIds };
export default FiltersProvider;
