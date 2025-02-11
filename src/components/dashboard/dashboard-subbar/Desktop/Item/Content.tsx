import { TTabRenderer } from "@/types/tabs";
import { ComponentType, FC } from "react";
import { ITabRendererProps } from "./types";
import CustomerEdit from "./Renderers/CustomerEdit";
import CustomerView from "./Renderers/CustomerView";
import PropertyEdit from "./Renderers/PropertyEdit";
import Agreement from "./Renderers/Agreement";
import Profile from "./Renderers/Profile";
import PropertyView from "./Renderers/PropertyView";
import User from "./Renderers/User";
import CustomerCreate from "./Renderers/CustomerCreate";
import PropertyCreate from "./Renderers/PropertyCreate";

// --------------------------------------------------------------------

type TRenderers = {
    [key in TTabRenderer]: ComponentType<ITabRendererProps>;
};

const RENDERERS: TRenderers = {
    CUSTOMER_CREATE: CustomerCreate,
    CUSTOMER_EDIT: CustomerEdit,
    CUSTOMER_VIEW: CustomerView,
    PROPERTY_CREATE: PropertyCreate,
    PROPERTY_EDIT: PropertyEdit,
    PROPERTY_VIEW: PropertyView,
    AGREEMENT: Agreement,
    PROFILE: Profile,
    USER: User,
};

// --------------------------------------------------------------------

interface ContentProps {
    renderer: TTabRenderer;
    resourceId?: number;
}

const Content: FC<ContentProps> = ({ renderer, resourceId }) => {
    try {
        const Renderer = RENDERERS[renderer];
        return <Renderer resourceId={resourceId} />;
    } catch (ex) {
        return null;
    }
};

export default Content;
