import { useTabsContext } from "@/contexts/tabs";
import { useCallback, useMemo } from "react";
import { IFilterProps } from "./types";
import { didChangeFields } from "./useChangedFields";

const useTabState = () => {
    const { getTabData, pushTab, removeTab } = useTabsContext();

    const tabData = useMemo(() => getTabData("/property"), [getTabData]);
    console.log("TABDATA: ", tabData);

    const onUpdate = useCallback((state: IFilterProps) => {
        const { filters } = state || {};

        const didChange = didChangeFields(filters);

        if (didChange) {
            pushTab({
                path: "/property",
                renderer: "PROPERTY_FITLERS",
                data: filters,
            });
        } else {
            removeTab("/property");
        }
    }, []);

    return [tabData, onUpdate] as const;
};

export default useTabState;
