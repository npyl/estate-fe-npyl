import AgreementsGuard from "@/components/authentication/agreements-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import ViewById from "@/sections/agreements/AgreementById";
import { NextPage } from "next";
import dynamic from "next/dynamic";
const AgreementPusher = dynamic(
    () => import("@/sections/agreements/AgreementById/AgreementPusher")
);

const ViewAgreementPage: NextPage = () => <ViewById />;

ViewAgreementPage.getLayout = (page) => (
    <DashboardLayout>
        <AgreementsGuard>
            <AgreementPusher />
            {page}
        </AgreementsGuard>
    </DashboardLayout>
);

export default ViewAgreementPage;
