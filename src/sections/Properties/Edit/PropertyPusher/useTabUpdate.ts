import { useTabsContext } from "@/contexts/tabs";
import { useGetProperty } from "@/hooks/property";
import { useCallback } from "react";
import getTab from "./getTab";

/**
 * Expose a callback to update a property tab from PROPERTY_CREATE to PROPERTY_EDIT renderer since the first edit of a property is considered "create" mode
 */
const useTabUpdate = () => {
    const { propertyId } = useGetProperty();
    const { pushTab } = useTabsContext();

    const updateTab = useCallback(() => {
        pushTab(getTab(propertyId, false));
    }, [propertyId, pushTab]);

    return { updateTab };
};

export default useTabUpdate;
