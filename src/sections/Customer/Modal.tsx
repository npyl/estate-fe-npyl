import { Box, IconButton, Modal } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import CustomerForm from "@/pages/customer/components/Form";
import { useCallback } from "react";
import { ICustomerPOST } from "@/types/customer";
import { useCreateOrUpdateCustomerMutation } from "@/services/customers";
import { useFormContext } from "react-hook-form";

interface ModalProps {
    onClose: () => void;
}

const CustomerModal: React.FC<ModalProps> = ({ onClose }) => {
    const { setValue } = useFormContext();

    const [create, { isError, isLoading }] =
        useCreateOrUpdateCustomerMutation();

    const handleSave = useCallback(async (body: ICustomerPOST) => {
        const newOwnerId = await create(body).unwrap();
        setValue("ownerId", newOwnerId);
        onClose();
    }, []);

    return (
        <Modal open onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    overflow: "auto",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 900,
                    maxHeight: 650,
                    bgcolor: "background.paper",
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 4,
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
