import type { NextPage } from "next";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import NotificationsGuard from "@/components/authentication/notification-guard";
import ViewAllNotifications from "@/sections/Notification/ViewAll";

const NotificationPage: NextPage = () => <ViewAllNotifications />;

NotificationPage.getLayout = (page) => (
    <DashboardLayout>
        <NotificationsGuard>{page} </NotificationsGuard>
    </DashboardLayout>
);

export default NotificationPage;
