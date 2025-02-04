import { SxProps, Theme, Tooltip } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import useDialog from "@/hooks/useDialog";
const CustomerModal = dynamic(() => import("@/sections/Customer/Modal"));
import dynamic from "next/dynamic";
import { FC, useCallback } from "react";
import { useCreateOrUpdateCustomerMutation } from "@/services/customers";
import { ICustomerPOST } from "@/types/customer";

const IconSx: SxProps<Theme> = {
    color: "blue",
    "&:hover": {
        cursor: "pointer",
    },
    fontSize: "large",
    border: "1px solid blue",
    borderRadius: "50%",
};

interface CreateTooltipProps {
    onCreate?: (id: number) => void;
}

const CreateTooltip: FC<CreateTooltipProps> = ({ onCreate }) => {
    const [create, { isLoading }] = useCreateOrUpdateCustomerMutation();
    const createCb = useCallback(async (d: ICustomerPOST) => {
        return await create(d).unwrap();
    }, []);

    const [isOpen, openModal, closeModal] = useDialog();

    return (
        <>
            <Tooltip title="Create a new Customer/Owner" placement="top">
                <AddOutlinedIcon sx={IconSx} onClick={openModal} />
            </Tooltip>

            {isOpen ? (
                <CustomerModal
                    isLoading={isLoading}
                    createCb={createCb}
                    onCreate={onCreate}
                    onClose={closeModal}
                />
            ) : null}
        </>
    );
};

export default CreateTooltip;
