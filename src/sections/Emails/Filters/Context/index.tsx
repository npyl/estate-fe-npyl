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

    setFrom: Dispatch<SetStateAction<string>>;
    setTo: Dispatch<SetStateAction<string>>;
    setPropertyIds: Dispatch<SetStateAction<number[]>>;

    deleteFilter: (filterKey: keyof IEmailFilters) => void;
};

const FiltersContext = createContext<State>({
    filters: INITIAL_STATE,
    ids: [],

    setFrom: () => {},
    setPropertyIds: () => {},
    setTo: () => [],

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
    const [to, setTo] = useState(_to);
    const [propertyIds, setPropertyIds] = useState<number[]>(_propertyIds);

    const filters: IEmailFilters = {
        from,
        to,
        propertyIds,
    };

    const ids = useCalculateIds(filters);

    const deleteFilter = useCallback((key: keyof IEmailFilters) => {
        if (key === "from") setFrom(INITIAL_STATE.from);
        if (key === "propertyIds") setPropertyIds(INITIAL_STATE.propertyIds);
        if (key === "to") setTo(INITIAL_STATE.to);
    }, []);

    return (
        <FiltersContext.Provider
            value={{
                filters,
                ids,
                // ...
                setFrom,
                setTo,
                setPropertyIds,
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
