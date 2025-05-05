import AdminGuard from "@/components/authentication/admin-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import Valuation from "@/sections/Valuation";
import { NextPage } from "next";

const ValuationPage: NextPage = () => <Valuation />;

ValuationPage.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>{page} </AdminGuard>
    </DashboardLayout>
);

export default ValuationPage;
