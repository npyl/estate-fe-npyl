import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
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
