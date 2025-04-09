import { useTabsContext } from "@/contexts/tabs";
import { useCallback, useMemo } from "react";
import { IFilterProps } from "./types";
import { didChangeFields } from "./useChangedFields";
import { initialState } from "./constant";
import { IPropertyFilter } from "@/types/properties";
import useTabData from "@/components/dashboard/dashboard-subbar/Items/useTabData";
import useCallbackSetter from "@/hooks/useCallbackSetter";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { IntegrationSite } from "@/types/listings";

// --------------------------------------------------------------------------------------

const SHOULD_UPDATE_DATA = true;

// --------------------------------------------------------------------------------------

const getIdsForTabData = (tabData: object) => Object.keys(tabData);

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
        : tabData?.integrationSites ?? initialState.filters.integrationSites,
});

const tabDataToFilterState = (
    tabData: IPropertyFilter | undefined,
    overrides: Overrides
): IFilterProps => {
    const filters = getFiltersWithUrlParamOverrides(tabData, overrides);

    return {
        filters,
        ids: filters ? getIdsForTabData(filters) : [],
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
    const tabData = useTabData("/property") as IPropertyFilter | undefined;

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
        const { filters } = p || {};

        const didChange = didChangeFields(filters);

        pushTab(
            {
                path: "/property",
                renderer: "PROPERTY_FITLERS",
                data: didChange ? filters : undefined,
            },
            SHOULD_UPDATE_DATA
        );
    }, []);

    const setState = useCallbackSetter(state, _setState);

    return [state, setState] as const;
};

export default useTabState;
