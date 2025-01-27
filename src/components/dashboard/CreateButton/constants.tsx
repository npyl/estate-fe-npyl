import HomeIcon from "@mui/icons-material/Home";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import TasksIcon from "@mui/icons-material/ConfirmationNumber";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { Users as UsersIcon } from "@/assets/icons/users";

const MENU_ITEMS = [
    {
        label: "Property",
        path: "/property/create",
        icon: <HomeIcon />,
    },
    {
        label: "Customer",
        path: "/customer/create",
        icon: <UsersIcon />,
    },
    {
        label: "Label",
        path: "/label",
        icon: <LabelImportantIcon />,
    },

    {
        label: "Task",
        path: "/tasks/create",
        icon: <TasksIcon />,
    },
    {
        label: "Agreement",
        path: "/agreements/create",
        icon: <HandshakeIcon />,
    },
];

export { MENU_ITEMS };
