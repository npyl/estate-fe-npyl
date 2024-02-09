import type { NextPage } from "next";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useGetNotificationsQuery } from "src/services/notification";
import { CollapsibleTable } from "./components/CollapsibleTable";
import { AdminGuard } from "src/components/authentication/admin-guard";

const NotificationPage: NextPage = () => {
    const { data: notifications } = useGetNotificationsQuery();

    const handleRemove = (index: number) =>
        console.log("will delete notification: ", index);

    return (
        <CollapsibleTable rows={notifications || []} onRemove={handleRemove} />
    );
};

NotificationPage.getLayout = (page) => (
    <AdminGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AdminGuard>
);

export default NotificationPage;
