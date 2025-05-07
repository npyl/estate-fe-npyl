import AdminGuard from "@/components/authentication/admin-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import ViewAll from "@/sections/Emails";
import { NextPage } from "next";

const EmailsPage: NextPage = () => <ViewAll />;

EmailsPage.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>{page} </AdminGuard>
    </DashboardLayout>
);

export default EmailsPage;
