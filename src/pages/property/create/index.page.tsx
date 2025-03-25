import type { NextPage } from "next";
import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import PropertyCreate from "@/sections/Properties/Create";

const CreatePropertyPage: NextPage = () => <PropertyCreate />;

CreatePropertyPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CreatePropertyPage;
