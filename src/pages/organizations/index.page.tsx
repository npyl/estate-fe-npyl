import type { NextPage } from "next";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { SecurityProvider } from "@/contexts/security";
import AuthGuard from "@/components/authentication/auth-guard";
import ViewAll from "@/sections/Organization/ViewAll";

const OrganizationsPage: NextPage = () => <ViewAll />;

OrganizationsPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <SecurityProvider>{page}</SecurityProvider>
        </DashboardLayout>
    </AuthGuard>
);

export default OrganizationsPage;
