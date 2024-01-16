import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import Form from "../components/Form";
import { useCreateOrUpdateCustomerMutation } from "src/services/customers";
import { ICustomerPOST } from "src/types/customer";

const CreateCustomer: NextPage = () => {
    const router = useRouter();

    const [create, { isError, isLoading }] =
        useCreateOrUpdateCustomerMutation();

    const handleSave = useCallback(
        (body: ICustomerPOST) =>
            create(body)
                .unwrap()
                .then((id) => router.push(`/customer/${id}`)),
        []
    );

    const handleCancel = useCallback(() => router.back(), []);

    return (
        <Form
            isLoading={isLoading}
            isError={isError}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
};

CreateCustomer.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CreateCustomer;
