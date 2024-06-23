import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import AgreementsSection from "@/sections/agreements";
import { NextPage } from "next";

const AgreementsPage: NextPage = () => {
    return <AgreementsSection />;
};

AgreementsPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default AgreementsPage;
