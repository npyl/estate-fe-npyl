import { TTabRenderer } from "@/types/tabs";
import { ComponentType, FC } from "react";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@/assets/icons/home";
import CustomersIcon from "@/assets/icons/customers";
import HomeEditIcon from "@/assets/icons/home-edit";
import CustomersEditIcon from "@/assets/icons/customers-edit";
import CustomersCreateIcon from "@/assets/icons/customers-create";
import HomeCreateIcon from "@/assets/icons/home-create";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

type TIcons = Record<TTabRenderer, ComponentType<any>>;

const ICONS: TIcons = {
    CUSTOMER_CREATE: CustomersCreateIcon,
    CUSTOMER_EDIT: CustomersEditIcon,
    CUSTOMER_VIEW: CustomersIcon,
    PROPERTY_FITLERS: HomeIcon,
    PROPERTY_CREATE: HomeCreateIcon,
    PROPERTY_EDIT: HomeEditIcon,
    PROPERTY_VIEW: HomeIcon,
    AGREEMENT: HandshakeIcon,
    TASK: ConfirmationNumberIcon,
    PROFILE: PersonIcon,
    USER: PersonIcon,
};

interface IconProps {
    renderer: TTabRenderer;
}

const Icon: FC<IconProps> = ({ renderer }) => {
    try {
        const Res = ICONS[renderer];
        if (!Res) return null;
        return <Res fontSize="small" />;
    } catch (ex) {
        return null;
    }
};

export default Icon;
