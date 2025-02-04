import { Drawer } from "@mui/material";
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
        <Drawer
            open
            anchor="right"
            PaperProps={{
                sx: {
                    width: {
                        xs: "100vw",
                        lg: "30vw",
                    },
                },
            }}
            onClose={onClose}
        >
            <CustomerForm
                compact
                customer={customer}
                isLoading={isLoading}
                isError={isError}
                onSave={handleSave}
                onCancel={onClose}
            />
        </Drawer>
    );
};

export default CustomerModal;
