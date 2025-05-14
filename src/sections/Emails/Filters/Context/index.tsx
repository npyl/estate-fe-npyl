import { IEmailFilters } from "@/types/email";
import {
    createContext,
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    useCallback,
    useContext,
    useState,
} from "react";
import { INITIAL_STATE } from "./constants";
import useCalculateIds from "./useCalculateIds";

type State = {
    filters: IEmailFilters;
    ids: (keyof IEmailFilters)[];

    to: string[];
    toFreeSoloed: string[];
    setToFreeSoloed: Dispatch<SetStateAction<string[]>>;

    isPropertyPage: boolean;
    isCustomerPage: boolean;
    currentPropertyId?: number;
    currentCustomerEmail?: string;

    setFrom: Dispatch<SetStateAction<string>>;
    setTo: Dispatch<SetStateAction<string[]>>;
    setPropertyIds: Dispatch<SetStateAction<number[]>>;

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

    const [from, setFrom] = useState("");
    const [to, setTo] = useState(_to ? [_to] : []);
    const [propertyIds, setPropertyIds] = useState<number[]>(_propertyIds);

    const [toFreeSoloed, setToFreeSoloed] = useState<string[]>([]);

    const filters: IEmailFilters = {
        from,
        to: [...to, ...toFreeSoloed],
        propertyIds,
    };

    const ids = useCalculateIds(filters);

    const isPropertyPage = Boolean(propertyId);
    const isCustomerPage = Boolean(_to);

    const deleteFilter = useCallback(
        (key: keyof IEmailFilters) => {
            if (key === "from") setFrom(INITIAL_STATE.from);

            if (key === "propertyIds" && isPropertyPage)
                setPropertyIds([propertyId!]);
            else if (key === "propertyIds")
                setPropertyIds(INITIAL_STATE.propertyIds);

            if (key === "to") setToFreeSoloed([]);
            if (key === "to" && isCustomerPage) setTo([_to]);
            else if (key === "to") setTo(INITIAL_STATE.to);
        },
        [isPropertyPage, isCustomerPage, propertyId, _to]
    );

    return (
        <FiltersContext.Provider
            value={{
                filters,
                ids,
                // ...
                to,
                toFreeSoloed,
                setToFreeSoloed,
                // ...
                isPropertyPage,
                isCustomerPage,
                currentPropertyId: propertyId,
                currentCustomerEmail: _to,
                // ...
                setFrom,
                setTo,
                setPropertyIds,
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
