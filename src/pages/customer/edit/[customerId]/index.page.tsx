import type { NextPage } from "next";
import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import CustomerPusher from "@/sections/Customer/EditById/CustomerPusher";
import CustomerEdit from "@/sections/Customer/EditById";

const EditCustomer: NextPage = () => <CustomerEdit />;

EditCustomer.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <CustomerPusher />
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default EditCustomer;
