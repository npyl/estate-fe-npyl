import type { NextPage } from "next";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

import { addTab } from "src/slices/tabs";
import { CollapsibleTable, createRow } from "./components/CollapsibleTable";

import { useGetNotificationByIdQuery } from "src/services/notification";

import { Paper } from "@mui/material";
import { resetState } from "src/slices/notification";

const NotificationPage: NextPage = () => {
	const dispatch = useDispatch();

	const publish = () => {
		useEffect(() => {
			dispatch(addTab({ title: "Notifications", path: "/notification" }));
			dispatch(resetState());
		}, []);
	};

	publish();

	// const { data: notifications } = useGetNotificationsQuery();

	// TODO: test data; remove
	const { data: notification1 } = useGetNotificationByIdQuery(1);
	const { data: notification2 } = useGetNotificationByIdQuery(2);

	const notifications = useMemo(() => {
		if (!notification1 || !notification2) return [];

		return [notification1, notification2];
	}, [notification1, notification2]);

	const rows = useMemo(
		() => notifications.map((notification) => createRow(notification)),
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
