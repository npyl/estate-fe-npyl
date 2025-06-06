import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import ListView from "@/sections/Properties/ViewAll/(ListView)";
import { FiltersProvider } from "@/sections/Properties/FiltersContext";
import { NextPage } from "next";

const ArchivedPage: NextPage = () => (
    <ListView archived sortBy="updatedAt" direction="DESC" />
);

ArchivedPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <FiltersProvider>{page}</FiltersProvider>
        </DashboardLayout>
    </AuthGuard>
);

export default ArchivedPage;
