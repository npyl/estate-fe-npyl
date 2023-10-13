import EditIcon from "@mui/icons-material/Edit"; // Make sure to import EditIcon
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { FC, useState } from "react";
import { useSecurityContext } from "src/contexts/security";
import { useAllUsersQuery } from "src/services/user";
import { UserForm } from "./UserForm";

type Props = {
    changeTab: (event: React.SyntheticEvent, newValue: number) => void;
};

const UserPage: FC<Props> = ({ changeTab }) => {
    const { data: users } = useAllUsersQuery();
    const { setSelectedUser } = useSecurityContext();

    const [openUserForm, setOpenUserForm] = useState(false);

    const handleOpenUserForm = () => setOpenUserForm(true);
    const handleCloseUserForm = () => {
        setOpenUserForm(false);
        setSelectedUser(-1);
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
                        {users?.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>TODO</TableCell>
                                <TableCell>{user.mobilePhone}</TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            setSelectedUser(user.id);
                                            handleOpenUserForm();
                                        }}
                                        sx={{ ml: 1, mr: -1 }}
                                    >
                                        <EditIcon fontSize="small" />
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
                            </TableRow>
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
