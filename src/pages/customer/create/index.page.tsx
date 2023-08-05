import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { usePublishTab } from "src/components/Tabs/utils";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useCreateCustomerMutation } from "src/services/customers";

const CreateCustomer: NextPage = () => {
    const router = useRouter();

    usePublishTab({ title: "Create Customer", path: "/customer/create" });

    const [createCustomer] = useCreateCustomerMutation();

    useEffect(() => {
        createCustomer() // create customer
            .unwrap()
            .then((id) => router.push(`/customer/edit/${id}`)) // redirect
            .catch((reason) => toast.error("Failed to create customer!"));
    }, []);

    return <></>;
};

CreateCustomer.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CreateCustomer;
