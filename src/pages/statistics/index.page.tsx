import type { NextPage } from "next";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import AdminGuard from "@/components/authentication/admin-guard";
import StatisticsPage from "@/sections/Statistics";

const Statistics: NextPage = () => <StatisticsPage />;

Statistics.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>{page}</AdminGuard>
    </DashboardLayout>
);

export default Statistics;
