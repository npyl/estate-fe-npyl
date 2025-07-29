import { NextPage } from "next";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import AdminGuard from "@/components/authentication/admin-guard";
import Settings from "@/sections/Settings";

const SettingsPage: NextPage = () => <Settings />;

SettingsPage.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>{page}</AdminGuard>
    </DashboardLayout>
);

export default SettingsPage;
