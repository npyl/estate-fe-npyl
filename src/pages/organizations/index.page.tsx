import type { NextPage } from "next";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import AuthGuard from "@/components/authentication/auth-guard";
import ViewAll from "@/sections/Organization/ViewAll";
import { FiltersProvider } from "@/sections/Organization/ViewAll/Filters/Context";

const OrganizationsPage: NextPage = () => <ViewAll />;

OrganizationsPage.getLayout = (page) => (
    <DashboardLayout>
        <AuthGuard>
            <FiltersProvider>{page}</FiltersProvider>
        </AuthGuard>
    </DashboardLayout>
);

export default OrganizationsPage;
