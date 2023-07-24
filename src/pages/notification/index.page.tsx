import { Paper } from "@mui/material";

import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

import { addTab } from "src/slices/tabs";

import { useGetNotificationsQuery } from "src/services/notification";

const NotificationPage: NextPage = () => {
	const dispatch = useDispatch();

	const publish = () => {
		useEffect(() => {
			alert("alot!");
			dispatch(addTab({ title: "Notifications", path: "/notification" }));
		}, []);
	};

	publish();

	const { data: notifications } = useGetNotificationsQuery();

	return (
		<>
			<Paper sx={{ flex: 1, mt: 1 }}></Paper>
		</>
	);
};

NotificationPage.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);

export default NotificationPage;
