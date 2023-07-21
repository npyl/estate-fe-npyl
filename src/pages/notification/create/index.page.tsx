import { Box, Grid, Paper, TextField, Typography } from "@mui/material";

import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useAddNotificationMutation } from "src/services/notification";

import { addTab } from "src/slices/tabs";

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

	const [addNotification] = useAddNotificationMutation();

	return (
		<>
			<Paper
				elevation={10}
				sx={{
					flex: 1,
					mt: 1,
				}}
			>
				<Grid container>
					<Grid item xs={4}>
						<Box
							sx={{
								px: 3,
								py: 1.5,
								textAlign: "center",
							}}
						>
							<Typography variant="h6">Notification Information</Typography>
						</Box>
						<Grid container spacing={1} p={1}>
							<Grid item xs={6}>
								<TextField label="Name"></TextField>
							</Grid>
							<Grid item xs={6}>
								<TextField label="Email"></TextField>
							</Grid>
							<Grid item xs={6}>
								<TextField label="Mobile Phone"></TextField>
							</Grid>
							<Grid item xs={6}>
								<TextField label="Message"></TextField>
							</Grid>
							<Grid item xs={6}>
								<TextField label="Property Code"></TextField>
							</Grid>
							<Grid item xs={6}>
								<TextField label="Tour Date"></TextField>
							</Grid>
							<Grid item xs={6}>
								<TextField label="Tour Time"></TextField>
							</Grid>
							<Grid item xs={6}>
								<TextField label="Tour Type"></TextField>
							</Grid>
							<Grid item xs={6}>
								<TextField label="Notification Date"></TextField>
							</Grid>
							<Grid item xs={6}>
								<TextField label="Viewed"></TextField>
							</Grid>
							<Grid item xs={6}>
								<TextField label="Notification Type"></TextField>
							</Grid>
						</Grid>
					</Grid>
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
