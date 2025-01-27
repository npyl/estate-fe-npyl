import { AdminGuard } from "@/components/authentication/admin-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import AgreementsSection from "@/sections/agreements";
import { NextPage } from "next";

const CreateAgreementPage: NextPage = () => {
    return <AgreementsSection create />;
};

CreateAgreementPage.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>{page} </AdminGuard>
    </DashboardLayout>
);

export default CreateAgreementPage;
