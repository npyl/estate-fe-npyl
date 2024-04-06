import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useTabsContext } from "src/contexts/tabs";
import {
    useCreateOrUpdateCustomerMutation,
    useLazyGetCustomerByIdQuery,
} from "src/services/customers";
import Form from "../../components/Form";
import { ICustomerPOST } from "src/types/customer";
import { useTranslation } from "react-i18next";

const useLoadCustomer = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { pushTab } = useTabsContext();

    const [getCustomer, { data: customer }] = useLazyGetCustomerByIdQuery();

    const { customerId } = router.query;

    useEffect(() => {
        if (!customerId) return;

        getCustomer(+customerId!)
            .unwrap()
            .then((c) => {
                const isFirstEdit = c.createdAt === c.updatedAt;
                const label = `${isFirstEdit ? t("Create") : t("Edit")} ${t(
                    "Customer_geniki"
                )} ${
                    (c?.firstName &&
                        c?.lastName &&
                        `${c.firstName} ${c.lastName}`) ||
                    ""
                }`;

                pushTab({
                    path: `/customer/edit/${customerId}`,
                    id: (customerId + "edit") as string,
                    label,
                });
            });
    }, [customerId, t]);

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
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default EditCustomer;
