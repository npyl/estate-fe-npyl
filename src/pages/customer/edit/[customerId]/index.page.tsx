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

    const { data } = useGetCustomerByIdQuery(+customerId!);
    const [edit, { isError, isLoading }] = useCreateOrUpdateCustomerMutation();

    useEffect(() => {
        if (data && customerId) {
            const isFirstEdit = data.createdAt === data.updatedAt;
            const label = `${isFirstEdit ? "Create" : "Edit"} customer ${
                (data?.firstName &&
                    data?.lastName &&
                    `${data.firstName} ${data.lastName}`) ||
                ""
            }`;

            pushTab({
                path: `/customer/edit/${customerId}`,
                id: (customerId + "edit") as string,
                label,
            });

            // TODO: ...
            // dispatch(setInitialNotesState(data.notes));
            // dispatch(setInitialCustomerState(data));
        }
    }, [data, customerId]);

    const handleEdit = useCallback(
        (body: ICustomerPOST) => edit(body).then(redirectToView),
        []
    );

    const redirectToView = useCallback(
        () => router.push(`/customer/${customerId}`),
        []
    );

    return (
        <Form
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
