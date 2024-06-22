import { IAgreementsFilters } from "@/types/agreements";
import { createContext, useCallback, useContext, useState } from "react";

type IAgreementsFiltersState = {
    filters: IAgreementsFilters;
    setFilter: (key: keyof IAgreementsFilters, v: any) => void;
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
    type: null,
    active: false,
    draft: false,
    keys: false,
    signed: false,
    expirationDate: "",
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

    return (
        <AgreementsFiltersContext.Provider
            value={{
                filters,
                setFilter: handleFilterChange,
            }}
            {...props}
        />
    );
};
