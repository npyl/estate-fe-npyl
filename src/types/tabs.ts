type TTabRenderer =
    | "CUSTOMER_VIEW"
    | "CUSTOMER_EDIT"
    | "PROPERTY_VIEW"
    | "PROPERTY_EDIT"
    | "AGREEMENT"
    | "PROFILE"
    | "USER";

interface ITab {
    path: string;
    renderer: TTabRenderer;
    resourceId: number;
}

export type { TTabRenderer, ITab };
