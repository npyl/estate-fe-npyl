import type { NextPage } from "next";
import { useMemo } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { CollapsibleTable, createRow } from "./components/CollapsibleTable";
import {
    useGetNotificationByIdQuery,
    useGetNotificationsQuery,
} from "src/services/notification";
import { Paper } from "@mui/material";
import { usePublishTab } from "src/components/Tabs/utils";
import { ContactNotification } from "src/types/notification";

const NotificationPage: NextPage = () => {
    // usePublishTab({ title: "Notifications", path: "/notification" });

    const { data: notifications } = useGetNotificationsQuery();

    // // TODO: test data; remove
    // const { data: notification1 } = useGetNotificationByIdQuery(1);
    // const { data: notification2 } = useGetNotificationByIdQuery(2);

    // const notifications = useMemo(() => {
    //     if (!notification1 && !notification2) return [];
    //     if (notification1 && !notification2) return [notification1];
    //     if (!notification1 && notification2) return [notification2];
    //     return [notification1, notification2];
    // }, [notification1, notification2]);

    const rows = useMemo(
        () =>
            notifications?.map((notification: ContactNotification) =>
                createRow(notification)
            ) || [],
        [notifications]
    );

    const handleRemove = (index: number) => {
        console.log("will delete notification: ", index);
    };

    return (
        <>
            <Paper sx={{ flex: 1, mt: 1 }}>
                <CollapsibleTable rows={rows} onRemove={handleRemove} />
            </Paper>
        </>
    );
};

NotificationPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default NotificationPage;
