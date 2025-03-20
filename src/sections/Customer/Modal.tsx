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
    isLoading?: boolean;
    isError?: boolean;

    onCreate?: (id: number) => void;

    createCb: (body: ICustomerPOST) => Promise<{ error: any } | { data: any }>;

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
            const res = await createCb(body);

            // INFO: if we support onCreate and we have received an id
            if (onCreate && !("error" in res) && typeof res.data === "number") {
                onCreate(res.data);
            }

            onClose();

            return res;
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
