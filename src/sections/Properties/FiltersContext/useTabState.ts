import { useTabsContext } from "@/contexts/tabs";
import { useCallback, useMemo } from "react";
import { IFilterProps } from "./types";

const useTabState = () => {
    const { getData, pushTab } = useTabsContext();

    const tabData = useMemo(() => getData("/property"), [getData]);

    const onUpdate = useCallback((state: IFilterProps) => {
        const { filters } = state || {};

        pushTab({
            path: "/property",
            renderer: "PROPERTIES",
            data: filters,
        });
    }, []);

    return [tabData, onUpdate] as const;
};

export default useTabState;
