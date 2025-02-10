import HomeIcon from "@mui/icons-material/Home";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import TasksIcon from "@mui/icons-material/ConfirmationNumber";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CustomersIcon from "@/assets/icons/customers";

const MENU_ITEMS = [
    {
        label: "Property",
        path: "/property/create",
        icon: <HomeIcon />,
    },
    {
        label: "Customer",
        path: "/customer/create",
        icon: <CustomersIcon />,
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
    {
        label: "Label",
        path: "/label",
        icon: <LabelImportantIcon />,
    },
];

export { MENU_ITEMS };
