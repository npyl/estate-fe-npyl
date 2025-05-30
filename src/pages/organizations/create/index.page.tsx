import type { NextPage } from "next";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import AuthGuard from "@/components/authentication/auth-guard";
import Create from "@/sections/Organization/Create";

const OrganizationsCreatePage: NextPage = () => <Create />;

OrganizationsCreatePage.getLayout = (page) => (
    <DashboardLayout>
        <AuthGuard>{page}</AuthGuard>
    </DashboardLayout>
);

export default OrganizationsCreatePage;
