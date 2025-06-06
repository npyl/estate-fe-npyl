import AgreementsGuard from "@/components/authentication/agreements-guard";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import ViewById from "@/sections/agreements/AgreementById";
import { NextPage } from "next";

const ViewAgreementPage: NextPage = () => <ViewById />;

ViewAgreementPage.getLayout = (page) => (
    <DashboardLayout>
        <AgreementsGuard>{page}</AgreementsGuard>
    </DashboardLayout>
);

export default ViewAgreementPage;
