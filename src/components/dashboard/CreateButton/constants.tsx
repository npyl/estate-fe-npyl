import HomeIcon from "@mui/icons-material/Home";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import TasksIcon from "@mui/icons-material/ConfirmationNumber";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CustomersIcon from "@/assets/icons/customers";
import MessageIcon from "@mui/icons-material/Message";
import EmailIcon from "@mui/icons-material/Email";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

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
        label: "B2B Customer",
        path: "/customerb2b/create",
        icon: <CorporateFareIcon />,
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
    {
        label: "Message",
        path: "/messages",
        icon: <MessageIcon />,
    },
    {
        label: "Email",
        path: "/emails",
        icon: <EmailIcon />,
    },
];

export { MENU_ITEMS };
