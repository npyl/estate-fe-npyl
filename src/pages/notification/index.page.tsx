import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useGetNotificationsQuery } from "src/services/notification";
import { CollapsibleTable } from "./components/CollapsibleTable";

const NotificationPage: NextPage = () => {
    const { data: notifications } = useGetNotificationsQuery();

    const handleRemove = (index: number) =>
        console.log("will delete notification: ", index);

    return (
        <CollapsibleTable rows={notifications || []} onRemove={handleRemove} />
    );
};

NotificationPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default NotificationPage;
