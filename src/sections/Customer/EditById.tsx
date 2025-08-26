import { useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { useCreateOrUpdateCustomerMutation } from "src/services/customers";
import Form from "@/sections/Customer/Form";
import { ICustomerPOST } from "src/types/customer";
import useGetCustomer from "@/sections/Customer/hooks/useGetCustomer";

const CustomerEdit = () => {
    const router = useRouter();
    const { customer, customerId } = useGetCustomer();

    const savedB2B = useRef(false);
    const [edit, { isError, isLoading }] = useCreateOrUpdateCustomerMutation();

    const handleEdit = useCallback(
        async (body: ICustomerPOST) => {
            const res = await edit({ ...body, id: +customerId! });
            if (!("error" in res)) {
                savedB2B.current = Boolean(body.b2b);
            }
            return res;
        },
        [customerId]
    );

    const redirectToView = useCallback(() => {
        const baseUrl = savedB2B.current ? "/b2b" : "/customer";
        router.push(`${baseUrl}/${customerId}`);
    }, [customerId]);

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
