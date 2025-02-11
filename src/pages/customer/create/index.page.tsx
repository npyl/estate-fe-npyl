import type { NextPage } from "next";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import CustomerPusher from "@/sections/Customer/Create/Pusher";
import CreateCustomer from "@/sections/Customer/Create";

const CreateCustomerPage: NextPage = () => <CreateCustomer />;

CreateCustomerPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <CustomerPusher />
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default CreateCustomerPage;
