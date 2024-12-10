import { SxProps, Theme, Tooltip } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import useDialog from "@/hooks/useDialog";
const CustomerModal = dynamic(() => import("@/sections/Customer/Modal"));
import dynamic from "next/dynamic";

const IconSx: SxProps<Theme> = {
    color: "blue",
    "&:hover": {
        cursor: "pointer",
    },
    fontSize: "large",
    border: "1px solid blue",
    borderRadius: "50%",
};

const CreateTooltip = () => {
    const [isOpen, openModal, closeModal] = useDialog();

    return (
        <>
            <Tooltip title="Create a new Customer/Owner" placement="top">
                <AddOutlinedIcon sx={IconSx} onClick={openModal} />
            </Tooltip>

            {isOpen ? <CustomerModal onClose={closeModal} /> : null}
        </>
    );
};

export default CreateTooltip;
