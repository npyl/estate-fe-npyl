import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useCreateOrUpdateCustomerMutation } from "src/services/customers";
import { useEffect } from "react";
import { useRouter } from "next/router";

const CreateCustomer: NextPage = () => {
    const router = useRouter();

    const [create] = useCreateOrUpdateCustomerMutation();

    useEffect(() => {
        // create()
        //     .unwrap()
        //     .then((id) => router.push(`/customer/edit/${id}`))
        //     .catch(() => router.back());
    }, []);

    return null;
};

CreateCustomer.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CreateCustomer;
