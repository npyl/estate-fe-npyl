import { TTabRenderer } from "@/types/tabs";
import { FC } from "react";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@/assets/icons/home";
import CustomersIcon from "@/assets/icons/customers";
import HomeEditIcon from "@/assets/icons/home-edit";
import CustomersEditIcon from "@/assets/icons/customers-edit";
import CustomersCreateIcon from "@/assets/icons/customers-create";
import HomeCreateIcon from "@/assets/icons/home-create";

const getIcon = (renderer: TTabRenderer) => {
    if (renderer === "AGREEMENT") return HandshakeIcon;
    if (renderer === "PROFILE" || renderer === "USER") return PersonIcon;
    if (renderer === "PROPERTY_CREATE") return HomeCreateIcon;
    if (renderer === "PROPERTY_VIEW") return HomeIcon;
    if (renderer === "PROPERTY_EDIT") return HomeEditIcon;
    if (renderer === "CUSTOMER_CREATE") return CustomersCreateIcon;
    if (renderer === "CUSTOMER_VIEW") return CustomersIcon;
    if (renderer === "CUSTOMER_EDIT") return CustomersEditIcon;
    return null;
};

interface IconProps {
    renderer: TTabRenderer;
}

const Icon: FC<IconProps> = ({ renderer }) => {
    const Res = getIcon(renderer);
    if (!Res) return null;
    return <Res fontSize="small" />;
};

export default Icon;
