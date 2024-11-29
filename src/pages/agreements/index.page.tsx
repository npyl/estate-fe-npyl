import { AdminGuard } from "@/components/authentication/admin-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import AgreementsSection from "@/sections/agreements";
import { NextPage } from "next";

const AgreementsPage: NextPage = () => {
    return <AgreementsSection />;
};

AgreementsPage.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>{page} </AdminGuard>
    </DashboardLayout>
);

export default AgreementsPage;
