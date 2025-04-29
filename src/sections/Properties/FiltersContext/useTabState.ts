import { useTabsContext } from "@/contexts/tabs";
import { useCallback, useLayoutEffect, useState } from "react";
import { IFilterProps } from "./types";
import { didChangeFields, getChangedFields } from "./useChangedFields";
import { initialState } from "./constant";
import { IPropertyFilter } from "@/types/properties";
import useTabData from "@/components/dashboard/dashboard-subbar/Items/useTabData";
import useCallbackSetter from "@/hooks/useCallbackSetter";
import {
    parseAsBoolean,
    parseAsInteger,
    parseAsString,
    useQueryState,
} from "nuqs";
import { IntegrationSite } from "@/types/listings";

// --------------------------------------------------------------------------------------

const SHOULD_UPDATE_DATA = true;

// --------------------------------------------------------------------------------------

const getIdsForTabData = (tabData: IPropertyFilter) => {
    const changed = getChangedFields(tabData);
    if (!changed) return [];
    return Object.keys(changed);
};

interface Overrides {
    managerId: number;
    integrationSite: IntegrationSite;
    active: boolean | null;
}

const getFiltersWithUrlParamOverrides = ({
    managerId,
    integrationSite,
    active,
}: Overrides): IPropertyFilter => ({
    ...initialState.filters,
    // ...
    managerId: managerId !== -1 ? managerId : initialState.filters.managerId,
    integrationSites: integrationSite
        ? [integrationSite]
        : initialState.filters.integrationSites,
    active: active ?? initialState.filters.active,
});

const hasOverrides = (
    managerId: number,
    active: boolean | null,
    integrationSite: string
) => managerId !== -1 || Boolean(active) || Boolean(integrationSite);

const useURLParams = () => {
    const [managerId] = useQueryState(
        "assignee",
        parseAsInteger.withDefault(-1)
    );

    const [active] = useQueryState("active", parseAsBoolean);

    const [_integrationSite] = useQueryState(
        "integrationSite",
        parseAsString.withDefault("")
    );
    const integrationSite = _integrationSite as IntegrationSite;

    const [params] = useState<Overrides>({
        managerId,
        active,
        integrationSite,
    });

    const [overrides] = useState(
        hasOverrides(managerId, active, integrationSite)
    );

    return [params, overrides] as const;
};

const useCurrentState = (setState: (p: IFilterProps) => void): IFilterProps => {
    //
    //  Url Params
    //
    const [overrides, hasOverrides] = useURLParams();
    useLayoutEffect(() => {
        if (!hasOverrides) return;
        const filters = getFiltersWithUrlParamOverrides(overrides);
        setState({
            filters,
            ids: getIdsForTabData(filters),
            sorting: "default",
        });
    }, [hasOverrides, overrides]);

    //
    //  Tab's Data
    //
    const tabData = useTabData("/property");
    const { sorting, ..._filters } = tabData || {};
    const filters = tabData
        ? (_filters as IPropertyFilter)
        : initialState.filters;
    const ids = tabData ? getIdsForTabData(filters) : [];

    return {
        filters,
        ids,
        sorting: sorting || "default",
    };
};

// --------------------------------------------------------------------------------------

const useTabState = () => {
    const { pushTab } = useTabsContext();

    const _setState = useCallback((p: IFilterProps) => {
        const { filters, sorting } = p || {};

        const didChange = sorting !== "default" || didChangeFields(filters);

        const data = didChange ? { ...filters, sorting } : undefined;

        pushTab(
            {
                path: "/property",
                renderer: "PROPERTY_FITLERS",
                data,
            },
            SHOULD_UPDATE_DATA
        );
    }, []);

    const state = useCurrentState(_setState);
    const setState = useCallbackSetter(state, _setState);

    return [state, setState] as const;
};

export default useTabState;
