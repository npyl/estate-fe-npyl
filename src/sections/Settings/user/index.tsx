import EditIcon from "@mui/icons-material/Edit";
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
import AnimatedTableRow from "@/sections/Settings/user/AnimatedTableRow";
const UserForm = dynamic(() => import("@/sections/User/Form"));
import IOSSwitch from "@/components/iOSSwitch";
import { Label } from "@/components/Label";
import { useSecurityContext } from "src/contexts/security";
import {
    useAllUsersQuery,
    useToggleActiveUserMutation,
} from "src/services/user";
import dynamic from "next/dynamic";
import GotoPermissions from "./GotoPermissions";

type ActiveStatusesType = {
    [userId: number]: boolean;
};

type ActiveNotificationsType = {
    [userId: number]: boolean;
};

interface Props {
    onGotoPermissions: VoidFunction;
}

const UserPage: FC<Props> = ({ onGotoPermissions }) => {
    const router = useRouter();
    const { data: users } = useAllUsersQuery();
    const { setSelectedUser } = useSecurityContext();
    const [toggleActiveUser] = useToggleActiveUserMutation();

    const [openUserForm, setOpenUserForm] = useState(false);
    const [activeStatuses, setActiveStatuses] = useState<ActiveStatusesType>(
        {}
    );

    useEffect(() => {
        if (users) {
            const initialStatuses: ActiveStatusesType = {};
            const initialNotifications: ActiveNotificationsType = {};
            users.forEach((user) => {
                initialStatuses[user.id] = user.isActive;
                initialNotifications[user.id] = user.notificationsEnabled;
            });
            setActiveStatuses(initialStatuses);
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
                            <TableCell>{t("Fullname")}</TableCell>
                            <TableCell>{t("Email")}</TableCell>
                            <TableCell>{t("Status")}</TableCell>
                            <TableCell>{t("Mobile Phone")}</TableCell>
                            <TableCell>{t("Update")}</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user) => (
                            <AnimatedTableRow
                                key={user.id}
                                onClick={() => handleRowClick(user.id)}
                            >
                                <TableCell>
                                    {user.firstName || ""} {user.lastName || ""}
                                </TableCell>
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
                                    <GotoPermissions
                                        userId={user.id}
                                        onGotoPermissions={onGotoPermissions}
                                    />
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
