import { Drawer, DrawerProps } from "@mui/material";
import CustomerForm, { CustomerFormProps } from "@/sections/Customer/Form";
import { useCallback } from "react";
import { ICustomerPOST } from "@/types/customer";

const PaperProps: DrawerProps["PaperProps"] = {
    sx: {
        width: {
            xs: "100vw",
            lg: "30vw",
        },

        ".PPFormBottomBar-bar": {
            width: 1,
            position: "sticky",
            bottom: 0,
        },
    },
};

/**
 * createCb: provide your own create callback so that we can either use
 * e.g. the standard useCreaterOrUpdateCustomerMutation or the useCreateOrUpdateCustomerForStayUpdatedMutation or any other
 */
interface ModalProps extends Omit<CustomerFormProps, "onSave" | "onCancel"> {
    onCreate?: (id: number) => void;

    createCb: (body: ICustomerPOST) => Promise<{ error: any } | { data: any }>;

    onClose: () => void;
}

const CustomerModal: React.FC<ModalProps> = ({
    quickCreate = false,
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
        <Drawer open anchor="right" PaperProps={PaperProps} onClose={onClose}>
            <CustomerForm
                compact
                quickCreate={quickCreate}
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
