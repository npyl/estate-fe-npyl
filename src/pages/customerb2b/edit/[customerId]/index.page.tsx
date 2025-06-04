import type { NextPage } from "next";
import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import CustomerEdit from "@/sections/Customer/EditById";

const EditCustomer: NextPage = () => <CustomerEdit b2b />;

EditCustomer.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default EditCustomer;
