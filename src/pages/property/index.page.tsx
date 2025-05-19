import type { NextPage } from "next";
import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FiltersProvider } from "@/sections/Properties/FiltersContext";
import ViewAll from "@/sections/Properties/ViewAll";

const Home: NextPage = () => <ViewAll />;

Home.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <FiltersProvider>{page}</FiltersProvider>
        </DashboardLayout>
    </AuthGuard>
);

export default Home;
