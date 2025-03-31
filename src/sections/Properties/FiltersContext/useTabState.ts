import { useTabsContext } from "@/contexts/tabs";
import { useCallback, useMemo } from "react";
import { IFilterProps } from "./types";
import { didChangeFields } from "./useChangedFields";
import { initialState } from "./constant";
import { IPropertyFilter } from "@/types/properties";
import useTabData from "@/components/dashboard/dashboard-subbar/Items/useTabData";
import useCallbackSetter from "@/hooks/useCookie/useCallbackSetter";
import { parseAsInteger, useQueryState } from "nuqs";

// --------------------------------------------------------------------------------------

const SHOULD_UPDATE_DATA = true;

// --------------------------------------------------------------------------------------

const getIdsForTabData = (tabData: object) => Object.keys(tabData);

interface Overrides {
    managerId: number;
}

const getFiltersWithUrlParamOverrides = (
    tabData: IPropertyFilter | undefined,
    { managerId }: Overrides
) => ({
    ...(tabData || initialState.filters),
    managerId: managerId !== -1 ? managerId : tabData?.managerId,
});

const tabDataToFilterState = (
    tabData: IPropertyFilter | undefined,
    managerId: number
): IFilterProps => {
    const filters = getFiltersWithUrlParamOverrides(tabData, { managerId });

    return {
        filters,
        ids: filters ? getIdsForTabData(filters) : [],
    };
};

const useCurrentState = () => {
    //
    //  Url Params
    //
    const [assignee] = useQueryState(
        "assignee",
        parseAsInteger.withDefault(-1)
    );

    //
    //  Tab's Data
    //
    const tabData = useTabData("/property") as IPropertyFilter | undefined;

    //
    //  Merging of all
    //
    const state = useMemo(
        () => tabDataToFilterState(tabData, assignee),
        [tabData, assignee]
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
