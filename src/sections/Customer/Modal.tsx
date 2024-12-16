import { Box, IconButton, Modal } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import CustomerForm from "@/pages/customer/components/Form";
import { useCallback } from "react";
import { ICustomerPOST } from "@/types/customer";
import { useCreateOrUpdateCustomerMutation } from "@/services/customers";

interface ModalProps {
    onCreate?: (id: number) => void;
    onClose: () => void;
}

const CustomerModal: React.FC<ModalProps> = ({ onCreate, onClose }) => {
    const [create, { isError, isLoading }] =
        useCreateOrUpdateCustomerMutation();

    const handleSave = useCallback(
        async (body: ICustomerPOST) => {
            const newOwnerId = await create(body).unwrap();
            onCreate?.(newOwnerId);
            onClose();
        },
        [onCreate]
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
