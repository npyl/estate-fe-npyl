import { useTabsContext } from "@/contexts/tabs";
import { useCallback, useMemo } from "react";
import { IFilterProps } from "./types";
import { didChangeFields } from "./useChangedFields";
import { initialState } from "./constant";
import { IPropertyFilter } from "@/types/properties";
import useTabData from "@/components/dashboard/dashboard-subbar/Items/useTabData";
import useCallbackSetter from "@/hooks/useCookie/useCallbackSetter";

const SHOULD_UPDATE_DATA = true;

const getIdsForTabData = (tabData: object) => Object.keys(tabData);

const tabDataToFilterState = (tabData?: IPropertyFilter): IFilterProps => ({
    filters: tabData || initialState.filters,
    ids: tabData ? getIdsForTabData(tabData) : [],
});

const useTabState = () => {
    const { pushTab } = useTabsContext();

    const tabData = useTabData("/property") as IPropertyFilter | undefined;

    const state = useMemo(() => tabDataToFilterState(tabData), [tabData]);

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
