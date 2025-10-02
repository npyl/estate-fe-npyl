import type { NextPage } from "next";
import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import LabelSection from "@/sections/Label";

const LabelsPage: NextPage = () => <LabelSection />;

LabelsPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default LabelsPage;
