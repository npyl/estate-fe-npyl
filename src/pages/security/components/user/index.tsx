import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Button,
    FormGroup,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AnimatedTableRow from "src/components/Table/AnimatedTableRow";
import { UserForm } from "src/components/User/Form";
import { IOSSwitch } from "src/components/iOSSwitch";
import { Label } from "@/components/Label";
import { useSecurityContext } from "src/contexts/security";
import {
    useAllUsersQuery,
    useToggleActiveNotificationMutation,
    useToggleActiveUserMutation,
} from "src/services/user";

type Props = {
    changeTab: (event: React.SyntheticEvent, newValue: number) => void;
};

type ActiveStatusesType = {
    [userId: number]: boolean;
};

type ActiveNotificationsType = {
    [userId: number]: boolean;
};

const UserPage: FC<Props> = ({ changeTab }) => {
    const router = useRouter();
    const { data: users } = useAllUsersQuery();
    const { setSelectedUser } = useSecurityContext();
    const [toggleActiveUser] = useToggleActiveUserMutation();
    const [toggleActiveNotification] = useToggleActiveNotificationMutation();

    const [openUserForm, setOpenUserForm] = useState(false);
    const [activeStatuses, setActiveStatuses] = useState<ActiveStatusesType>(
        {}
    );
    const [activeNotifications, setActiveNotifications] =
        useState<ActiveNotificationsType>({});

    useEffect(() => {
        if (users) {
            const initialStatuses: ActiveStatusesType = {};
            const initialNotifications: ActiveNotificationsType = {};
            users.forEach((user) => {
                initialStatuses[user.id] = user.isActive;
                initialNotifications[user.id] = user.notificationsEnabled;
            });
            setActiveStatuses(initialStatuses);
            setActiveNotifications(initialNotifications);
        }
    }, [users]);

    const handleToggleActiveStatus = async (
        event: React.ChangeEvent<HTMLInputElement>,
        userId: number
    ) => {
        // Prevent further propagation of the event
        event.stopPropagation();

        const currentStatus = event.target.checked;

        // Optimistically update the UI for a faster response
        setActiveStatuses((prevStatuses) => ({
            ...prevStatuses,
            [userId]: currentStatus,
        }));

        try {
            // Make the API request and await its result
            await toggleActiveUser(userId);
        } catch (error) {
            // If the request fails, revert the UI change
            setActiveStatuses((prevStatuses) => ({
                ...prevStatuses,
                [userId]: !currentStatus, // revert the status
            }));

            // Optionally, show an error message to the user
            console.error("Failed to update user status:", error);
        }
    };

    const handleToggleActiveNotifications = async (
        event: React.ChangeEvent<HTMLInputElement>,
        userId: number
    ) => {
        // Prevent further propagation of the event
        event.stopPropagation();

        const currentNotificationStatus = event.target.checked;

        // Optimistically update the UI for a faster response
        setActiveNotifications((prevNotifications) => ({
            ...prevNotifications,
            [userId]: currentNotificationStatus,
        }));

        try {
            // Make the API request and await its result
            await toggleActiveNotification(userId);
        } catch (error) {
            // If the request fails, revert the UI change
            setActiveNotifications((prevNotifications) => ({
                ...prevNotifications,
                [userId]: !currentNotificationStatus, // revert the status
            }));

            // Optionally, show an error message to the user
            console.error("Failed to update user notification status:", error);
        }
    };

    const handleOpenUserForm = () => setOpenUserForm(true);
    const handleCloseUserForm = () => {
        setOpenUserForm(false);
        setSelectedUser(-1);
    };
    const handleRowClick = (userId: number) => {
        setSelectedUser(userId);
        router.push(`/user/${userId}`);
    };
    const { t } = useTranslation();
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: "20px" }}
                onClick={handleOpenUserForm}
            >
                {t("Create User")}
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("First Name")}</TableCell>
                            <TableCell>{t("Last Name")}</TableCell>
                            <TableCell>{t("Email")}</TableCell>
                            <TableCell>{t("Status")}</TableCell>
                            <TableCell>{t("Notifications")}</TableCell>
                            <TableCell>{t("Mobile Phone")}</TableCell>
                            <TableCell>{t("Update")}</TableCell>
                            <TableCell>{t("Permissions")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user: any) => (
                            <AnimatedTableRow
                                key={user.id}
                                onClick={() => handleRowClick(user.id)}
                            >
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {user.isAdmin ? (
                                        <Label
                                            opaque
                                            color="info"
                                            name={t("Admin")}
                                        />
                                    ) : (
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <IOSSwitch
                                                        checked={
                                                            activeStatuses[
                                                                user.id
                                                            ] || false
                                                        } // fallback to 'false' if the id is not yet in the state
                                                        onChange={(e) => {
                                                            e.stopPropagation();
                                                            handleToggleActiveStatus(
                                                                e,
                                                                user.id
                                                            );
                                                        }}
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                        name="isActiveSwitch"
                                                        sx={{ m: 1 }}
                                                    />
                                                }
                                                label="Active"
                                            />
                                        </FormGroup>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {user.isAdmin ? (
                                        <Label
                                            opaque
                                            color="info"
                                            name={t("Admin")}
                                        />
                                    ) : (
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <IOSSwitch
                                                        checked={
                                                            activeNotifications[
                                                                user.id
                                                            ] || false
                                                        } // fallback to 'false' if the id is not yet in the state
                                                        onChange={(e) => {
                                                            e.stopPropagation();
                                                            handleToggleActiveNotifications(
                                                                e,
                                                                user.id
                                                            );
                                                        }}
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                        name="isActiveSwitch"
                                                        sx={{ m: 1 }}
                                                    />
                                                }
                                                label="View all"
                                            />
                                        </FormGroup>
                                    )}
                                </TableCell>

                                <TableCell>{user.mobilePhone}</TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            setSelectedUser(user.id);
                                            handleOpenUserForm();
                                            e.stopPropagation();
                                        }}
                                        sx={{ ml: 1, mr: -1 }}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="text"
                                        sx={{ color: "#5e5e5e" }}
                                        onClick={(e) => {
                                            changeTab(e, 1);
                                            setSelectedUser(user.id);
                                            e.stopPropagation();
                                        }}
                                    >
                                        <VisibilityIcon fontSize="small"></VisibilityIcon>
                                    </Button>
                                </TableCell>
                            </AnimatedTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openUserForm && (
                <UserForm open={openUserForm} onClose={handleCloseUserForm} />
            )}
        </div>
    );
};

export default UserPage;
