import { Paper } from "@mui/material";
import type { NextPage } from "next";
import { useMemo } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useGetNotificationsQuery } from "src/services/notification";
import { ContactNotification } from "src/types/notification";
import { CollapsibleTable, createRow } from "./components/CollapsibleTable";

const NotificationPage: NextPage = () => {
    const { data: notifications } = useGetNotificationsQuery();

    const rows = useMemo(
        () =>
            notifications?.map((notification: ContactNotification) =>
                createRow(notification)
            ) || [],
        [notifications]
    );

    const handleRemove = (index: number) =>
        console.log("will delete notification: ", index);

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
