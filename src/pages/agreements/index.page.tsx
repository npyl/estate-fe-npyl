import AgreementsGuard from "@/components/authentication/agreements-guard";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import AgreementsSection from "@/sections/agreements";
import { NextPage } from "next";

const AgreementsPage: NextPage = () => {
    return <AgreementsSection />;
};

AgreementsPage.getLayout = (page) => (
    <DashboardLayout>
        <AgreementsGuard>{page} </AgreementsGuard>
    </DashboardLayout>
);

export default AgreementsPage;
