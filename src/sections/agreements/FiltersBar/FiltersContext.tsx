import { IAgreementsFilters } from "@/types/agreements";
import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

type IAgreementsFiltersState = {
    filters: IAgreementsFilters;
    changedFields: Record<keyof IAgreementsFilters, any>;
    setFilter: (key: keyof IAgreementsFilters, v: any) => void;
    clearFilter: (key: keyof IAgreementsFilters) => void;
};

const AgreementsFiltersContext = createContext<
    IAgreementsFiltersState | undefined
>(undefined);

export const useAgreementsFiltersContext = () => {
    const context = useContext(AgreementsFiltersContext);
    if (context === undefined) {
        throw new Error(
            "AgreementsFiltersContext value is undefined. Make sure you use the AgreementsFiltersContext before using the context."
        );
    }
    return context;
};

const INITIAL_FILTER_STATE: IAgreementsFilters = {
    variants: null,
    active: null,
    draft: null,
    keys: null,
    signed: null,
    expiresBy: null,
};

export const AgreementsFiltersProvider: React.FC<
    React.PropsWithChildren<unknown>
> = (props) => {
    const [filters, setFilters] =
        useState<IAgreementsFilters>(INITIAL_FILTER_STATE);

    const handleFilterChange = useCallback(
        (key: keyof IAgreementsFilters, v: any) =>
            setFilters((old) => ({ ...old, [key]: v })),
        []
    );

    const clearFilter = useCallback(
        (key: keyof IAgreementsFilters) =>
            setFilters((old) => ({ ...old, [key]: INITIAL_FILTER_STATE[key] })),
        []
    );

    const changedFields = useMemo(
        () =>
            Object.entries(filters).reduce((acc: any, [key, value]) => {
                if (value !== INITIAL_FILTER_STATE[key]) {
                    acc[key] = value;
                }
                return acc;
            }, {}),
        [filters]
    );

    return (
        <AgreementsFiltersContext.Provider
            value={{
                filters,
                changedFields,
                setFilter: handleFilterChange,
                clearFilter,
            }}
            {...props}
        />
    );
};
