import { Box, IconButton, Modal } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import CustomerForm from "@/sections/Customer/Form";
import { useCallback } from "react";
import { ICustomer, ICustomerPOST } from "@/types/customer";

/**
 * createCb: provide your own create callback so that we can either use
 * e.g. the standard useCreaterOrUpdateCustomerMutation or the useCreateOrUpdateCustomerForStayUpdatedMutation or any other
 */
interface ModalProps {
    customer?: ICustomer;

    createCb: (body: ICustomerPOST) => Promise<number | void>;
    isLoading?: boolean;
    isError?: boolean;

    onCreate?: (id: number) => void;
    onClose: () => void;
}

const CustomerModal: React.FC<ModalProps> = ({
    customer,

    createCb,
    isLoading = false,
    isError = false,

    onCreate,
    onClose,
}) => {
    const handleSave = useCallback(
        async (body: ICustomerPOST) => {
            const newOwnerId = await createCb(body);

            if (newOwnerId && onCreate) {
                onCreate(newOwnerId);
            }

            onClose();
        },
        [createCb, onCreate]
    );

    return (
        <Modal open onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    overflow: "auto",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "70vw",
                    maxHeight: 650,
                    bgcolor: "background.paper",
                    borderRadius: "10px",
                    boxShadow: 24,
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                    }}
                >
                    <ClearIcon />
                </IconButton>
                <CustomerForm
                    customer={customer}
                    isLoading={isLoading}
                    isError={isError}
                    onSave={handleSave}
                    onCancel={onClose}
                />
            </Box>
        </Modal>
    );
};

export default CustomerModal;
