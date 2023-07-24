import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";

import { Box, Button, Divider, MenuItem, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { FC, ReactNode, useState } from "react";
import StyledMenu from "../StyledMenu";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import Subbar from "./dashboard-subbar";

import { addTab } from "src/slices/tabs";
import { useDispatch } from "src/store";

import { Users as UsersIcon } from "../../icons/users";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { CircleNotifications } from "@mui/icons-material";

interface DashboardLayoutProps {
	children?: ReactNode;
}

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
	display: "flex",
	flex: "1 1 auto",
	maxWidth: "100%",
	paddingTop: 64,
	marginRight: "16px",
	[theme.breakpoints.up("md")]: {
		paddingLeft: 220,
	},
}));

export const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
	const { children } = props;

	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const dispatch = useDispatch();
	const router = useRouter();

	const propertyItemType = "property-menu-item";
	const managerItemType = "manager-menu-item";
	const ownerItemType = "owner-menu-item";
	const labelItemType = "label-menu-item";
	const notificationItemType = "notification-menu-item";

	interface tabConfigProp {
		title: string;
		path: string;
	}

	const showDropdown = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const hideDropdown = () => {
		setAnchorEl(null);
	};

	const startCreate = (
		event: React.MouseEvent<HTMLElement>,
		itemType: string
	) => {
		var tabConfig: tabConfigProp;

		var title: string = "";
		var path: string = "";

		if (itemType === propertyItemType) {
			title = "Create Property";
			path = "/property/create";
		} else if (itemType === managerItemType) {
			title = "Create Manager";
			path = "/user/create";
		} else if (itemType === ownerItemType) {
			title = "Create Customer";
			path = "/customer/create";
		} else if (itemType === labelItemType) {
			title = "Create Label";
			path = "/label";
		} else if (itemType === notificationItemType) {
			title = "Create Notification";
			path = "/notification/create";
		}

		tabConfig = {
			title: title,
			path: path,
		};

		router.push(path);

		dispatch(addTab(tabConfig));
	};

	return (
		<>
			<DashboardLayoutRoot>
				<Box
					sx={{
						marginBottom: 0,

						display: "flex",
						flex: "1 1 auto",
						flexDirection: "column",
						width: "100%",
					}}
				>
					<Paper
						sx={{
							marginTop: "24px",
							padding: 2,
							overflowX: "auto",
						}}
					>
						<Stack
							alignItems={"center"}
							direction={"row"}
							justifyContent={"space-between"}
							spacing={1}
						>
							<Subbar />
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "flex-end",
									position: "sticky",
									right: 0,
									top: 0,
								}}
							>
								<Button
									sx={{
										minWidth: "90px",
										marginRight: "15px",
									}}
									id="create-menu-button"
									aria-controls={open ? "create-menu" : undefined}
									aria-haspopup="true"
									aria-expanded={open ? "true" : undefined}
									variant="contained"
									disableElevation
									onClick={showDropdown}
								>
									<AddIcon />
									Create
								</Button>
							</Box>
							<StyledMenu
								id="create-menu"
								MenuListProps={{
									"aria-labelledby": "create-menu-button",
								}}
								anchorEl={anchorEl}
								open={open}
								onClose={hideDropdown}
							>
								<MenuItem
									onClick={(e) => startCreate(e, propertyItemType)}
									disableRipple
								>
									<HomeIcon />
									Property
								</MenuItem>
								<MenuItem
									onClick={(e) => startCreate(e, managerItemType)}
									disableRipple
								>
									<ManageAccountsIcon fontSize="small" />
									Manager
								</MenuItem>
								<Divider sx={{ my: 0.5 }} />
								<MenuItem
									onClick={(e) => startCreate(e, ownerItemType)}
									disableRipple
								>
									<UsersIcon fontSize="small" />
									Customer
								</MenuItem>
								<MenuItem
									onClick={(e) => startCreate(e, labelItemType)}
									disableRipple
								>
									<LabelImportantIcon fontSize="small" />
									Label
								</MenuItem>
								<MenuItem
									onClick={(e) => startCreate(e, notificationItemType)}
									disableRipple
								>
									<CircleNotifications fontSize="small" />
									Notification
								</MenuItem>
							</StyledMenu>
						</Stack>
					</Paper>
					{children}
				</Box>
			</DashboardLayoutRoot>
			<DashboardNavbar onOpenSidebar={(): void => setIsSidebarOpen(true)} />
			<DashboardSidebar
				onClose={(): void => setIsSidebarOpen(false)}
				open={isSidebarOpen}
			/>
		</>
	);
};

DashboardLayout.propTypes = {
	children: PropTypes.node,
};
