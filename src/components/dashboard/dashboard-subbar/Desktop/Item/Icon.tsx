import { TTabRenderer } from "@/types/tabs";
import { FC } from "react";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@/assets/icons/home";
import CustomersIcon from "@/assets/icons/customers";

const getIcon = (renderer: TTabRenderer) => {
    if (renderer === "AGREEMENT") return HandshakeIcon;
    if (renderer === "PROFILE" || renderer === "USER") return PersonIcon;
    if (renderer === "PROPERTY_VIEW") return HomeIcon;
    if (renderer === "PROPERTY_EDIT") return null;
    if (renderer === "CUSTOMER_VIEW") return CustomersIcon;
    if (renderer === "CUSTOMER_EDIT") return null;
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
