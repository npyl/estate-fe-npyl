import { useCallback } from "react";
import { useRouter } from "next/router";
import { useCreateOrUpdateCustomerMutation } from "src/services/customers";
import Form from "@/sections/Customer/Form";
import { ICustomerPOST } from "src/types/customer";
import useGetCustomer from "@/hooks/customer";

const CustomerEdit = () => {
    const router = useRouter();
    const { customer, customerId } = useGetCustomer();

    const [edit, { isError, isLoading }] = useCreateOrUpdateCustomerMutation();

    const handleEdit = useCallback(
        (body: ICustomerPOST) => edit({ ...body, id: +customerId! }),
        [customerId]
    );

    const redirectToView = useCallback(
        () => router.push(`/customer/${customerId}`),
        [customerId]
    );

    return (
        <Form
            customer={customer}
            isLoading={isLoading}
            isError={isError}
            onSave={handleEdit}
            onSaveSuccess={redirectToView}
            onCancel={redirectToView}
        />
    );
};

export default CustomerEdit;
