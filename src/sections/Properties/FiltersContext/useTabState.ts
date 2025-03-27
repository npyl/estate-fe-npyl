import { useTabsContext } from "@/contexts/tabs";
import { useCallback, useMemo } from "react";
import { IFilterProps } from "./types";
import { didChangeFields } from "./useChangedFields";
import { initialState } from "./constant";
import { IPropertyFilter } from "@/types/properties";
import useCallbackSetter from "@/hooks/useCookie/useCallbackSetter";

const SHOULD_UPDATE_DATA = true;

const getIdsForTabData = (tabData: object) => Object.keys(tabData);

const tabDataToFilterState = (tabData?: IPropertyFilter): IFilterProps => ({
    filters: tabData || initialState.filters,
    ids: tabData ? getIdsForTabData(tabData) : [],
});

const useTabState = () => {
    const { getTabData, pushTab, removeTab } = useTabsContext();

    const state = useMemo(() => {
        const tabData = getTabData("/property");
        return tabDataToFilterState(tabData);
    }, [getTabData]);

    const _setState = useCallback(
        (p: IFilterProps) => {
            const { filters } = p || {};

            const didChange = didChangeFields(filters);

            if (didChange) {
                pushTab(
                    {
                        path: "/property",
                        renderer: "PROPERTY_FITLERS",
                        data: filters,
                    },
                    SHOULD_UPDATE_DATA
                );
            } else {
                removeTab("/property");
            }
        },
        [pushTab, removeTab]
    );

    const setState = useCallbackSetter(state, _setState);

    return [state, setState] as const;
};

export default useTabState;
