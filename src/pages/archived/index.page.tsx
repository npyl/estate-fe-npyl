import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import ViewAll from "@/sections/Properties/(ViewAll)";
import { FiltersProvider } from "@/sections/Properties/FiltersContext";
import { NextPage } from "next";

const ArchivedPage: NextPage = () => (
    <ViewAll archived sortBy="updatedAt" direction="DESC" />
);

ArchivedPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <FiltersProvider>{page}</FiltersProvider>
        </DashboardLayout>
    </AuthGuard>
);

export default ArchivedPage;
