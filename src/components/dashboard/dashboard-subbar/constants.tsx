import HomeIcon from "@mui/icons-material/Home";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { Users as UsersIcon } from "@/assets/icons/users";

const propertyItemType = "property-menu-item";
const ownerItemType = "owner-menu-item";
const labelItemType = "label-menu-item";

const itemTypeToPath: { [key: string]: string } = {
    [propertyItemType]: "/property/create",
    [ownerItemType]: "/customer/create",
    [labelItemType]: "/label",
};

const MENU_ITEMS = [
    {
        label: "Property",
        path: propertyItemType,
        icon: <HomeIcon />,
    },
    {
        label: "Customer",
        path: ownerItemType,
        icon: <UsersIcon />,
    },
    {
        label: "Label",
        path: labelItemType,
        icon: <LabelImportantIcon />,
    },
];

export { MENU_ITEMS, itemTypeToPath };
