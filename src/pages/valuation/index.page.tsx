import AdminGuard from "@/components/authentication/admin-guard";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import { FiltersProvider } from "@/sections/Properties/FiltersContext";
import Valuation from "@/sections/Valuation";
import { NextPage } from "next";

const ValuationPage: NextPage = () => <Valuation />;

ValuationPage.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>
            <FiltersProvider>{page}</FiltersProvider>
        </AdminGuard>
    </DashboardLayout>
);

export default ValuationPage;
