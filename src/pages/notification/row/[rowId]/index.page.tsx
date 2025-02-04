import { AdminGuard } from "src/components/authentication/admin-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import type { NextPage } from "next";
import ViewNotificationById from "@/sections/Notification/ViewById";

const NotificationDetailPage: NextPage = () => <ViewNotificationById />;

NotificationDetailPage.getLayout = (page) => (
    <AdminGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AdminGuard>
);

export default NotificationDetailPage;
