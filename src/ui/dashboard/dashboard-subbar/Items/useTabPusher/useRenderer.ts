import { TTabRenderer } from "@/types/tabs";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import useTabData from "../useTabData";
import { IPropertyFilter } from "@/types/properties";

// --------------------------------------------------------------------------------------

const isProperty = (p: string) => p.startsWith("/property");

const isCustomer = (p: string) =>
    p.startsWith("/customer/") || p.startsWith("/b2b/");
const isCustomerCreate = (p: string) =>
    p.startsWith("/customer/create") || p.startsWith("/b2b/create");
const isCustomerEdit = (p: string) =>
    p.startsWith("/customer/edit") || p.startsWith("/b2b/edit");

// --------------------------------------------------------------------------------------

const getPropertyRenderer = (
    path: string,
    hasResourceId: boolean,
    tabData: IPropertyFilter | undefined
) => {
    if (path.startsWith("/property/create")) return "PROPERTY_CREATE";
    if (path.startsWith("/property/edit")) return "PROPERTY_EDIT";

    if (hasResourceId) return "PROPERTY_VIEW";

    const isFilters = Boolean(tabData);
    if (isFilters) return "PROPERTY_FITLERS";

    return undefined;
};

const getCustomerRenderer = (path: string) => {
    if (isCustomerEdit(path)) return "CUSTOMER_EDIT";
    if (isCustomerCreate(path)) return "CUSTOMER_CREATE";
    if (isCustomer(path)) return "CUSTOMER_VIEW";
};

// --------------------------------------------------------------------------------------

const useRenderer = (hasResourceId: boolean): TTabRenderer | undefined => {
    const path = usePathname();

    const tabData = useTabData("/property") as IPropertyFilter | undefined;

    const renderer = useMemo(() => {
        // INFO: race-condition?
        if (!path) return;

        // Property
        if (isProperty(path))
            return getPropertyRenderer(path, hasResourceId, tabData);

        // Customer & B2B Customer
        if (isCustomer(path)) return getCustomerRenderer(path);

        // Blog
        if (path.startsWith("/blog/create")) return "BLOG_POST_CREATE";

        if (!hasResourceId) return;

        // Other (w/ Id)
        if (path.startsWith("/agreements")) return "AGREEMENT";
        if (path.startsWith("/tasks")) return "TASK";
        if (path.startsWith("/user")) return "USER";
        if (path.startsWith("/profile")) return "PROFILE";
        if (path.startsWith("/blog")) return "BLOG_POST";
    }, [path, hasResourceId, tabData]);

    return renderer;
};

export default useRenderer;
