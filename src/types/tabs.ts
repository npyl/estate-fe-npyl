type TTabRenderer =
    | "CUSTOMER_CREATE"
    | "CUSTOMER_VIEW"
    | "CUSTOMER_EDIT"
    | "PROPERTY_FITLERS"
    | "PROPERTY_CREATE"
    | "PROPERTY_VIEW"
    | "PROPERTY_EDIT"
    | "AGREEMENT"
    | "TASK"
    | "PROFILE"
    | "USER";

interface ITab {
    path: string;
    renderer: TTabRenderer;
    resourceId?: number;
    data?: object;
}

export type { TTabRenderer, ITab };
