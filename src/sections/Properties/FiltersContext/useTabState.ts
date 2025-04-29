import { useTabsContext } from "@/contexts/tabs";
import { useCallback, useMemo } from "react";
import { IFilterProps } from "./types";
import { didChangeFields, getChangedFields } from "./useChangedFields";
import { initialState } from "./constant";
import { IPropertyFilter } from "@/types/properties";
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
    activeState: "active" | "inactive" | undefined;
}

const getFiltersWithUrlParamOverrides = (
    tabData: IPropertyFilter | undefined,
    { managerId, integrationSite, activeState }: Overrides
): IPropertyFilter => ({
    ...(tabData || initialState.filters),
    // ...
    managerId: managerId !== -1 ? managerId : tabData?.managerId,
    integrationSites: integrationSite
        ? [integrationSite]
        : tabData?.integrationSites ?? initialState.filters.integrationSites,
    active:
        activeState === "active"
            ? true
            : activeState === "inactive"
            ? false
            : tabData?.active ?? initialState.filters.active,
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

    const [activeStateRaw] = useQueryState("activeState", parseAsString);

    const activeState = useMemo(() => {
        if (activeStateRaw === "active" || activeStateRaw === "inactive") {
            return activeStateRaw;
        }
        return undefined;
    }, [activeStateRaw]);

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
        () =>
            tabDataToFilterState(tabData, {
                managerId,
                integrationSite,
                activeState,
            }),
        [tabData, managerId, activeState]
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
