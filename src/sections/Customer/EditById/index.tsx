import { FC, useCallback } from "react";
import { useRouter } from "next/router";
import {
    useCreateOrUpdateCustomerMutation,
    useGetCustomerByIdQuery,
} from "src/services/customers";
import Form from "@/sections/Customer/Form";
import { ICustomerPOST } from "src/types/customer";

const useLoadCustomer = () => {
    const router = useRouter();
    const { customerId } = router.query;
    const { data: customer } = useGetCustomerByIdQuery(+customerId!);
    return { customer, customerId };
};

interface Props {
    b2b?: boolean;
}

const CustomerEdit: FC<Props> = ({ b2b = false }) => {
    const router = useRouter();
    const { customer, customerId } = useLoadCustomer();

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
