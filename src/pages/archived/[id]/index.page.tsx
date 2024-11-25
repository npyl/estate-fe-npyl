import { AdminGuard } from "@/components/authentication/admin-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import ViewPropertyById from "@/sections/Properties/ViewById";
import { NextPage } from "next";

const ArchivedByIdPage: NextPage = () => <ViewPropertyById archived />;

ArchivedByIdPage.getLayout = (page) => (
    <AdminGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AdminGuard>
);

export default ArchivedByIdPage;
