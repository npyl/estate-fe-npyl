import { useTabsContext } from "@/contexts/tabs";
import { TTabRenderer } from "@/types/tabs";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const useRenderer = (hasResourceId: boolean): TTabRenderer | undefined => {
    const path = usePathname();

    const { getTabData } = useTabsContext();

    const renderer = useMemo(() => {
        // Property
        if (path.startsWith("/property/edit")) return "PROPERTY_EDIT";
        if (path.startsWith("/property/create")) return "PROPERTY_CREATE";
        if (path.startsWith("/property")) {
            const isFilters = Boolean(getTabData("/property"));

            return hasResourceId
                ? "PROPERTY_VIEW"
                : isFilters
                ? "PROPERTY_FITLERS"
                : undefined;
        }

        // Customer
        if (path.startsWith("/customer/edit")) return "CUSTOMER_EDIT";
        if (path.startsWith("/customer/create")) return "CUSTOMER_CREATE";
        if (path.startsWith("/customer/")) return "CUSTOMER_VIEW";

        if (!hasResourceId) return;

        // Other (w/ Id)
        if (path.startsWith("/agreements")) return "AGREEMENT";
        if (path.startsWith("/tasks")) return "TASK";
        if (path.startsWith("/user")) return "USER";
        if (path.startsWith("/profile")) return "PROFILE";
    }, [path, hasResourceId, getTabData]);

    return renderer;
};

export default useRenderer;
