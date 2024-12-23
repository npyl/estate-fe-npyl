import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import {
    useCreateOrUpdateCustomerMutation,
    useGetCustomerByIdQuery,
} from "src/services/customers";
import Form from "@/sections/Customer/Form";
import { ICustomerPOST } from "src/types/customer";
import CustomerPusher from "@/sections/Customer/EditById/CustomerPusher";

const useLoadCustomer = () => {
    const router = useRouter();
    const { customerId } = router.query;
    const { data: customer } = useGetCustomerByIdQuery(+customerId!);
    return { customer, customerId };
};

const EditCustomer: NextPage = () => {
    const router = useRouter();
    const { customer, customerId } = useLoadCustomer();

    const [edit, { isError, isLoading }] = useCreateOrUpdateCustomerMutation();

    const handleEdit = useCallback(
        (body: ICustomerPOST) =>
            edit({ ...body, id: +customerId! }).then(redirectToView),
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
            onCancel={redirectToView}
        />
    );
};

EditCustomer.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <CustomerPusher />
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default EditCustomer;
