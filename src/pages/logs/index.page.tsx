import { NextPage } from "next";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import AdminGuard from "@/components/authentication/admin-guard";
import ViewAll from "@/sections/Logs/ViewAll";

const Logs: NextPage = () => <ViewAll />;

Logs.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>{page} </AdminGuard>
    </DashboardLayout>
);

export default Logs;
