import type { NextPage } from "next";
import AuthGuard from "@/components/authentication/auth-guard";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import dynamic from "next/dynamic";
import ViewById from "@/sections/Customer/ViewById";

const CustomerPusher = dynamic(
    () => import("@/sections/Customer/ViewById/CustomerPusher")
);

const CustomerView: NextPage = () => <ViewById />;

CustomerView.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <CustomerPusher />
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default CustomerView;
