import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useMemo,
    useState,
    useCallback,
} from "react";
import { INITIAL_STATE } from "./constants";
import useCalculateIds from "./useCalculateIds";
import { Filters } from "./types";

type Setters = {
    setResources: (resources: any[]) => void;
    setActions: (actions: any[]) => void;
    setUsers: (users: any[]) => void;
    setFromDate: (fromDate: any) => void;
    setToDate: (toDate: any) => void;
    setSearch: (search: string) => void;
    setCustomersIds: (customersIds: number[]) => void;
    setPropertiesIds: (propertiesIds: number[]) => void;
};

type State = Setters & {
    filters: Filters;
    ids: (keyof Filters)[];

    // Individual filter states
    resources: any[];
    actions: any[];
    users: any[];
    fromDate?: any;
    toDate?: any;
    search: string;
    customersIds: number[];
    propertiesIds: number[];

    deleteFilter: (filterKey: keyof Filters | "all") => void;
    resetState: () => void;

    // Computed values
    sumOfChangedProperties: number;
    changedFields: Partial<Filters>;
};

const LogsFiltersContext = createContext<State | undefined>(undefined);

export const useFiltersContext = () => {
    const context = useContext(LogsFiltersContext);
    if (context === undefined) {
        throw new Error(
            "LogsFiltersContext value is undefined. Make sure you use the LogsFiltersProvider before using the context."
        );
    }
    return context;
};

interface ProviderProps extends PropsWithChildren {
    propertyId?: number;
    customerId?: number;
}

const LogsFiltersProvider: FC<ProviderProps> = ({
    propertyId,
    customerId,
    children,
}) => {
    // State for all filter fields
    const [resources, setResources] = useState<any[]>(INITIAL_STATE.resources);
    const [actions, setActions] = useState<any[]>(INITIAL_STATE.actions);
    const [users, setUsers] = useState<any[]>(INITIAL_STATE.users);
    const [fromDate, setFromDate] = useState<any>(INITIAL_STATE.fromDate);
    const [toDate, setToDate] = useState<any>(INITIAL_STATE.toDate);
    const [search, setSearch] = useState<string>(INITIAL_STATE.search);
    const [customersIds, setCustomersIds] = useState<number[]>(
        INITIAL_STATE.customersIds
    );
    const [propertiesIds, setPropertiesIds] = useState<number[]>(
        INITIAL_STATE.propertiesIds
    );

    const filters: Filters = useMemo(
        () => ({
            resources,
            actions,
            users,
            search,
            customersIds: Boolean(customerId)
                ? [...customersIds, customerId!]
                : customersIds,
            propertiesIds: Boolean(propertyId)
                ? [...propertiesIds, propertyId!]
                : propertiesIds,
            ...(fromDate && { fromDate }),
            ...(toDate && { toDate }),
        }),
        [
            resources,
            actions,
            users,
            search,
            fromDate,
            toDate,
            customerId,
            customersIds,
            propertiesIds,
        ]
    );

    const ids = useCalculateIds(filters);

    const setters: Setters = useMemo(
        () => ({
            setResources,
            setActions,
            setUsers,
            setFromDate,
            setToDate,
            setSearch,
            setCustomersIds,
            setPropertiesIds,
        }),
        []
    );

    const resetState = useCallback(() => {
        setResources(INITIAL_STATE.resources);
        setActions(INITIAL_STATE.actions);
        setUsers(INITIAL_STATE.users);
        setFromDate(INITIAL_STATE.fromDate);
        setToDate(INITIAL_STATE.toDate);
        setSearch(INITIAL_STATE.search);
        setCustomersIds(INITIAL_STATE.customersIds);
        setPropertiesIds(INITIAL_STATE.propertiesIds);
    }, []);

    const deleteFilter = useCallback(
        (filterKey: keyof Filters) => {
            try {
                if (!(filterKey in INITIAL_STATE)) {
                    return;
                }

                const capitalizedKey =
                    (filterKey as string).charAt(0).toUpperCase() +
                    (filterKey as string).slice(1);

                const setterName = `set${capitalizedKey}` as keyof Setters;
                const setter = setters[setterName];

                if (!setter || typeof setter !== "function") {
                    return;
                }

                // Get the initial value and reset the field
                const initialValue = INITIAL_STATE[filterKey];
                (setter as any)(initialValue);
            } catch (err) {}
        },
        [setters, resetState]
    );

    // Computed values
    const sumOfChangedProperties = useMemo(() => {
        return Object.keys(INITIAL_STATE).reduce((acc, key) => {
            const currentValue = filters[key];
            const initialValue = INITIAL_STATE[key];

            if (currentValue !== initialValue) {
                if (Array.isArray(currentValue)) {
                    return currentValue.length > 0 ? acc + 1 : acc;
                } else {
                    return currentValue ? acc + 1 : acc;
                }
            }
            return acc;
        }, 0);
    }, [filters]);

    const changedFields = useMemo(() => {
        return Object.entries(filters).reduce((acc: any, [key, value]) => {
            if (value !== INITIAL_STATE[key]) {
                acc[key] = value;
            }
            return acc;
        }, {});
    }, [filters]);

    return (
        <LogsFiltersContext.Provider
            value={{
                filters,
                ids,
                // Individual states
                resources,
                actions,
                users,
                fromDate,
                toDate,
                search,
                customersIds,
                propertiesIds,
                // Setters
                ...setters,
                // Actions
                deleteFilter,
                resetState,
                // Computed values
                sumOfChangedProperties,
                changedFields,
            }}
        >
            {children}
        </LogsFiltersContext.Provider>
    );
};

// Selector hooks (automatically work with new fields)
export const useSelectResources = () => useFiltersContext().resources;
export const useSelectActions = () => useFiltersContext().actions;
export const useSelectUsers = () => useFiltersContext().users;
export const useSelectSearch = () => useFiltersContext().search;
export const useSelectFromDate = () => useFiltersContext().fromDate;
export const useSelectToDate = () => useFiltersContext().toDate;
export const useSelectCustomersIds = () => useFiltersContext().customersIds;
export const useSelectPropertiesIds = () => useFiltersContext().propertiesIds;
export const useSelectIds = () => useFiltersContext().ids;
export const useSelectAll = () => useFiltersContext().filters;
export const useSelectSumOfChangedProperties = () =>
    useFiltersContext().sumOfChangedProperties;
export const useSelectChangedFields = () => useFiltersContext().changedFields;

export default LogsFiltersProvider;
