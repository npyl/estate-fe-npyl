import {
    Button,
    FormGroup,
    IconButton,
    Paper,
    Switch,
    SwitchProps,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useSecurityContext } from "src/contexts/security";
import {
    useAllUsersQuery,
    useToggleActiveUserMutation,
} from "src/services/user";
import { UserForm } from "../../../../components/User/Form";
import AnimatedTableRow from "src/components/Table/AnimatedTableRow";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Label } from "src/components/label";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
    />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor:
                    theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
                opacity: 1,
                border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color:
                theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22,
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
    },
}));

type Props = {
    changeTab: (event: React.SyntheticEvent, newValue: number) => void;
};

type ActiveStatusesType = {
    [userId: number]: boolean;
};

const UserPage: FC<Props> = ({ changeTab }) => {
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
            users.forEach((user) => {
                initialStatuses[user.id] = user.isActive;
            });
            setActiveStatuses(initialStatuses);
        }
    }, [users]);

    const handleToggleActive = async (
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

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: "20px" }}
                onClick={handleOpenUserForm}
            >
                Create User
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Mobile Phone</TableCell>
                            <TableCell>Update</TableCell>
                            <TableCell>Permissions</TableCell>
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
                                        <Label opaque color="info">
                                            Admin
                                        </Label>
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
                                                            handleToggleActive(
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
                                        Edit
                                        {/* <EditIcon fontSize="small" /> */}
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="text"
                                        color="success"
                                        onClick={(e) => {
                                            changeTab(e, 1);
                                            setSelectedUser(user.id);
                                        }}
                                    >
                                        Set
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
