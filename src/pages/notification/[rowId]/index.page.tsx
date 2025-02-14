import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import type { NextPage } from "next";
import ViewNotificationById from "@/sections/Notification/ViewById";
import NotificationsGuard from "@/components/authentication/notification-guard";

const NotificationDetailPage: NextPage = () => <ViewNotificationById />;

NotificationDetailPage.getLayout = (page) => (
    <DashboardLayout>
        <NotificationsGuard>{page} </NotificationsGuard>
    </DashboardLayout>
);

export default NotificationDetailPage;
