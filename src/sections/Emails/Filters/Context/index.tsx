import { IEmailFilters, TMailbox } from "@/types/email";
import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useMemo,
    useState,
} from "react";
import useCalculateIds from "./useCalculateIds";
import useDeleteFilter from "./useDeleteFilter";
import { Setters } from "./types";
import useFromTo from "./useFromTo";

type State = Setters & {
    filters: IEmailFilters;
    ids: (keyof IEmailFilters)[];

    manager: string;
    box: TMailbox;
    people: string[];
    peopleFreeSoloed: string[];

    isPropertyPage: boolean;
    isCustomerPage: boolean;
    currentPropertyId?: number;
    currentCustomerEmail?: string;

    deleteFilter: (filterKey: keyof IEmailFilters) => void;
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

    const [manager, setManager] = useState("");

    const [box, setBox] = useState<TMailbox>("INBOX");

    const [people, setPeople] = useState<string[]>([]);
    const [peopleFreeSoloed, setPeopleFreeSoloed] = useState<string[]>([]);

    const [search, setSearch] = useState("");
    const FROM_TO = useFromTo(manager, box, people, peopleFreeSoloed);
    const [propertyIds, setPropertyIds] = useState<number[]>(_propertyIds);

    const filters: IEmailFilters = { search, ...FROM_TO, propertyIds };

    console.log("FILTERS: ", filters);

    const ids = useCalculateIds(filters);

    const isPropertyPage = Boolean(propertyId);
    const isCustomerPage = Boolean(_to);

    const setters: Setters = useMemo(
        () => ({
            setManager,
            setBox,
            setPeople,
            setPeopleFreeSoloed,
            setPropertyIds,
            setSearch,
        }),
        [
            setManager,
            setBox,
            setPeople,
            setPeopleFreeSoloed,
            setPropertyIds,
            setSearch,
        ]
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
                manager,
                box,
                people,
                peopleFreeSoloed,
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
