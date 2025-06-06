import { TTabRenderer } from "@/types/tabs";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import useTabData from "../useTabData";
import { IPropertyFilter } from "@/types/properties";

const useRenderer = (hasResourceId: boolean): TTabRenderer | undefined => {
    const path = usePathname();

    const tabData = useTabData("/property") as IPropertyFilter | undefined;

    const renderer = useMemo(() => {
        // INFO: race-condition?
        if (!path) return;

        // Property
        if (path.startsWith("/property/create")) return "PROPERTY_CREATE";
        if (path.startsWith("/property/edit")) return "PROPERTY_EDIT";
        if (path.startsWith("/property")) {
            const isFilters = Boolean(tabData);

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

        // B2B Customer
        if (path.startsWith("/customerb2b/edit")) return "CUSTOMER_B2B_EDIT";
        if (path.startsWith("/customerb2b/create"))
            return "CUSTOMER_B2B_CREATE";
        if (path.startsWith("/customerb2b/")) return "CUSTOMER_B2B_VIEW";

        if (!hasResourceId) return;

        // Other (w/ Id)
        if (path.startsWith("/agreements")) return "AGREEMENT";
        if (path.startsWith("/tasks")) return "TASK";
        if (path.startsWith("/user")) return "USER";
        if (path.startsWith("/profile")) return "PROFILE";
    }, [path, hasResourceId, tabData]);

    return renderer;
};

export default useRenderer;
