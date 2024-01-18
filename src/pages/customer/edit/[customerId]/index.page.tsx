import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useTabsContext } from "src/contexts/tabs";
import {
    useCreateOrUpdateCustomerMutation,
    useGetCustomerByIdQuery,
} from "src/services/customers";
import Form from "../../components/Form";
import { ICustomerPOST } from "src/types/customer";

const EditCustomer: NextPage = () => {
    const router = useRouter();
    const { pushTab } = useTabsContext();
    const { customerId } = router.query;

    const { data: customer } = useGetCustomerByIdQuery(+customerId!);
    const [edit, { isError, isLoading }] = useCreateOrUpdateCustomerMutation();

    useEffect(() => {
        if (customer && customerId) {
            const isFirstEdit = customer.createdAt === customer.updatedAt;
            const label = `${isFirstEdit ? "Create" : "Edit"} customer ${
                (customer?.firstName &&
                    customer?.lastName &&
                    `${customer.firstName} ${customer.lastName}`) ||
                ""
            }`;

            pushTab({
                path: `/customer/edit/${customerId}`,
                id: (customerId + "edit") as string,
                label,
            });
        }
    }, [customer, customerId]);

    const handleEdit = useCallback(
        (body: ICustomerPOST) =>
            edit({ ...body, id: +customerId! }).then(redirectToView),
        [customerId]
    );

    const redirectToView = useCallback(
        () => router.push(`/customer/${customerId}`),
        []
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
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default EditCustomer;
