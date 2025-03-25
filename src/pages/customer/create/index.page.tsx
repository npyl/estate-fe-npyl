import type { NextPage } from "next";
import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import CreateCustomer from "@/sections/Customer/Create";

const CreateCustomerPage: NextPage = () => <CreateCustomer />;

CreateCustomerPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CreateCustomerPage;
