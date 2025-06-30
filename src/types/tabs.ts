import { TPropertyFilterExtended } from "./properties";

type TTabRenderer =
    | "CUSTOMER_CREATE"
    | "CUSTOMER_VIEW"
    | "CUSTOMER_EDIT"
    | "PROPERTY_FITLERS"
    | "PROPERTY_EDIT"
    | "PROPERTY_CREATE"
    | "PROPERTY_VIEW"
    | "AGREEMENT"
    | "TASK"
    | "PROFILE"
    | "USER"
    | "BLOG_POST"
    | "BLOG_POST_CREATE";

interface BaseTab {
    path: string;
    resourceId?: number;
}

interface GenericTab extends BaseTab {
    renderer: Exclude<TTabRenderer, "PROPERTY_FITLERS">;
    data?: any;
}

interface PropertyFiltersTab extends BaseTab {
    renderer: "PROPERTY_FITLERS";
    data?: TPropertyFilterExtended;
}

type ITab = GenericTab | PropertyFiltersTab;

export type { TTabRenderer, ITab };
