import { useTabsContext } from "@/contexts/tabs";
import { useCallback, useMemo } from "react";
import { IFilterProps } from "./types";
import { didChangeFields } from "./useChangedFields";
import { initialState } from "./constant";
import { IPropertyFilter } from "@/types/properties";
import useTabData from "@/components/dashboard/dashboard-subbar/Items/useTabData";

const SHOULD_UPDATE_DATA = true;

const getIdsForTabData = (tabData: object) => Object.keys(tabData);

const tabDataToFilterState = (tabData?: IPropertyFilter): IFilterProps => ({
    filters: tabData || initialState.filters,
    ids: tabData ? getIdsForTabData(tabData) : [],
});

const useTabState = () => {
    const { pushTab, removeTab } = useTabsContext();

    const tabData = useTabData("/property") as IPropertyFilter | undefined;

    const state = useMemo(() => tabDataToFilterState(tabData), [tabData]);

    const setState = useCallback(
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

    return [state, setState] as const;
};

export default useTabState;
