import { TTabRenderer } from "@/types/tabs";
import { ComponentType, FC } from "react";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@/assets/icons/home";
import HomeCreateIcon from "@/assets/icons/home-create";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PropertyEditIcon from "./PropertEditIcon";
import {
    CustomerViewIcon,
    CustomerCreateIcon,
    CustomerEditIcon,
} from "./Customer";
import RssFeedIcon from "@mui/icons-material/RssFeed";

type TIcons = Record<TTabRenderer, ComponentType<any>>;

const ICONS: TIcons = {
    CUSTOMER_CREATE: CustomerCreateIcon,
    CUSTOMER_EDIT: CustomerEditIcon,
    CUSTOMER_VIEW: CustomerViewIcon,
    // ...
    PROPERTY_FITLERS: HomeIcon,
    PROPERTY_EDIT: PropertyEditIcon,
    PROPERTY_CREATE: HomeCreateIcon,
    PROPERTY_VIEW: HomeIcon,
    // ...
    AGREEMENT: HandshakeIcon,
    TASK: ConfirmationNumberIcon,
    PROFILE: PersonIcon,
    USER: PersonIcon,
    BLOG_POST: RssFeedIcon,
};

const needResourceId = (renderer: TTabRenderer) =>
    renderer === "PROPERTY_EDIT" ||
    renderer === "CUSTOMER_VIEW" ||
    renderer === "CUSTOMER_EDIT";

interface IconProps {
    renderer: TTabRenderer;
    resourceId?: number;
}

const Icon: FC<IconProps> = ({ renderer, resourceId }) => {
    try {
        const Res = ICONS[renderer];
        if (!Res) return null;

        const props = needResourceId(renderer) ? { resourceId } : {};

        return <Res fontSize="small" {...props} />;
    } catch (ex) {
        return null;
    }
};

export default Icon;
