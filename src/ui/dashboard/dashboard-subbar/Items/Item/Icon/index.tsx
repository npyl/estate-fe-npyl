import { TTabRenderer } from "@/types/tabs";
import { ComponentType, FC } from "react";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@/assets/icons/home";
import CustomersIcon from "@/assets/icons/customers";
import CustomersEditIcon from "@/assets/icons/customers-edit";
import CustomersCreateIcon from "@/assets/icons/customers-create";
import HomeCreateIcon from "@/assets/icons/home-create";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PropertyEditIcon from "./PropertEditIcon";

type TIcons = Record<TTabRenderer, ComponentType<any>>;

const ICONS: TIcons = {
    CUSTOMER_CREATE: CustomersCreateIcon,
    CUSTOMER_EDIT: CustomersEditIcon,
    CUSTOMER_VIEW: CustomersIcon,
    CUSTOMER_B2B_CREATE: CorporateFareIcon,
    CUSTOMER_B2B_EDIT: CorporateFareIcon,
    CUSTOMER_B2B_VIEW: CorporateFareIcon,
    PROPERTY_FITLERS: HomeIcon,
    PROPERTY_EDIT: PropertyEditIcon,
    PROPERTY_CREATE: HomeCreateIcon,
    PROPERTY_VIEW: HomeIcon,
    AGREEMENT: HandshakeIcon,
    TASK: ConfirmationNumberIcon,
    PROFILE: PersonIcon,
    USER: PersonIcon,
};

interface IconProps {
    renderer: TTabRenderer;
    resourceId?: number;
}

const Icon: FC<IconProps> = ({ renderer, resourceId }) => {
    try {
        const Res = ICONS[renderer];
        if (!Res) return null;

        const props = renderer === "PROPERTY_EDIT" ? { resourceId } : {};

        return <Res fontSize="small" {...props} />;
    } catch (ex) {
        return null;
    }
};

export default Icon;
