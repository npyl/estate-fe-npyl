import type { NextPage } from "next";
import AuthGuard from "@/components/authentication/auth-guard";

import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import DashboardSection from "@/sections/dashboard";

const Dashboard: NextPage = () => {
    return <DashboardSection />;
};

Dashboard.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Dashboard;
