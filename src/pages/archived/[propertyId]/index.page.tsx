import AuthGuard from "@/components/authentication/auth-guard";

import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import ViewPropertyById from "@/sections/Properties/ViewById";
import { NextPage } from "next";

const ArchivedByIdPage: NextPage = () => <ViewPropertyById archived />;

ArchivedByIdPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default ArchivedByIdPage;
