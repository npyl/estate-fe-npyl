import { useTabsContext } from "@/contexts/tabs";
import { useCallback, useMemo } from "react";
import { IFilterProps } from "./types";
import { didChangeFields, getChangedFields } from "./useChangedFields";
import { initialState } from "./constant";
import {
    IPropertyFilter,
    PropertyFilterExtended2Base,
    TPropertyFilterExtended,
} from "@/types/properties";
import useTabData from "@/components/dashboard/dashboard-subbar/Items/useTabData";
import useCallbackSetter from "@/hooks/useCallbackSetter";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
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
}

const getFiltersWithUrlParamOverrides = (
    tabData: IPropertyFilter | undefined,
    { managerId, integrationSite }: Overrides
): IPropertyFilter => ({
    ...(tabData || initialState.filters),
    // ...
    managerId: managerId !== -1 ? managerId : tabData?.managerId,
    integrationSites: integrationSite
        ? [integrationSite]
        : (tabData?.integrationSites ?? initialState.filters.integrationSites),
});

const tabDataToFilterState = (
    tabData: TPropertyFilterExtended | undefined,
    overrides: Overrides
): IFilterProps => {
    const _filters = tabData ? PropertyFilterExtended2Base(tabData) : undefined;
    const filters = getFiltersWithUrlParamOverrides(_filters, overrides);

    return {
        filters,
        ids: filters ? getIdsForTabData(filters) : [],
        sorting: tabData?.sorting || initialState.sorting,
    };
};

const useCurrentState = () => {
    //
    //  Url Params
    //
    const [managerId] = useQueryState(
        "assignee",
        parseAsInteger.withDefault(-1)
    );

    const [_integrationSite] = useQueryState(
        "integrationSite",
        parseAsString.withDefault("")
    );
    const integrationSite = _integrationSite as IntegrationSite;

    //
    //  Tab's Data
    //
    const tabData = useTabData("/property");

    //
    //  Merging of all
    //
    const state = useMemo(
        () => tabDataToFilterState(tabData, { managerId, integrationSite }),
        [tabData, managerId]
    );

    return state;
};

// --------------------------------------------------------------------------------------

const useTabState = () => {
    const { pushTab } = useTabsContext();

    const state = useCurrentState();

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

    const setState = useCallbackSetter(state, _setState);

    return [state, setState] as const;
};

export default useTabState;
