import AgreementsGuard from "@/components/authentication/agreements-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import AgreementsSection from "@/sections/agreements";
import { NextPage } from "next";

const CreateAgreementPage: NextPage = () => {
    return <AgreementsSection create />;
};

CreateAgreementPage.getLayout = (page) => (
    <DashboardLayout>
        <AgreementsGuard>{page}</AgreementsGuard>
    </DashboardLayout>
);

export default CreateAgreementPage;
