import { NextPage } from "next";
import { SecurityProvider } from "@/contexts/security";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import AdminGuard from "@/components/authentication/admin-guard";
import Settings from "@/sections/Settings";

const SettingsPage: NextPage = () => <Settings />;

SettingsPage.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>
            <SecurityProvider>{page}</SecurityProvider>
        </AdminGuard>
    </DashboardLayout>
);

export default SettingsPage;
