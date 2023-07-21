import { Grid, Paper } from "@mui/material";

import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

import { addTab } from "src/slices/tabs";

import { useGetNotificationsQuery } from "src/services/notification";

const NotificationCreatePage: NextPage = () => {
	const dispatch = useDispatch();

	const publish = () => {
		useEffect(() => {
			dispatch(
				addTab({ title: "Create Notification", path: "/notification/create" })
			);
		}, []);
	};

	publish();

	return (
		<>
			<Paper sx={{ flex: 1, mt: 1 }}>
				<Grid>
					{/* private String customerName;
    private String customerEmail;
    private String customerMobile;
    private String message;

    private String propertyCode;
    private String tourDate;
    private String tourTime;
    private String tourType; */}
				</Grid>
			</Paper>
		</>
	);
};

NotificationCreatePage.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);

export default NotificationCreatePage;
