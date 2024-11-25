import { AdminGuard } from "@/components/authentication/admin-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import ViewAll from "@/sections/Properties/(ViewAll)";
import { NextPage } from "next";

const ArchivedPage: NextPage = () => (
    <ViewAll archived sortBy="updatedAt" direction="DESC" />
);

ArchivedPage.getLayout = (page) => (
    <AdminGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AdminGuard>
);

export default ArchivedPage;
