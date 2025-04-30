import AdminGuard from "@/components/authentication/admin-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import Deals from "@/sections/Deals";
import { NextPage } from "next";

const DealsPage: NextPage = () => <Deals />;

DealsPage.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>{page} </AdminGuard>
    </DashboardLayout>
);

export default DealsPage;
